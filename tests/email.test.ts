import assert from "node:assert/strict";
import { createHmac } from "node:crypto";
import { test, mock } from "node:test";
import { eventInstant, reminderSchedule } from "../lib/email/schedule";
import { bookingEmail, bookingAlert, lifecycleEmail, EmailOrder, escapeHtml } from "../lib/email/templates";
import { sendEmail, EmailProviderError } from "../lib/email/provider";
import { verifyEmailWebhook, shouldSuppressEmail } from "../lib/email/webhook";

const event = { id: "event-1", slug: "afrobeats-picnic", title: "Afrobeats Picnic", date: "2026-11-14", startTime: "18:00", endTime: "23:00", timezone: "Africa/Lagos", venue: "Muri Okunola Park", state: "Lagos, Nigeria", organiser: { name: "Tickety Experiences" } };
const order: EmailOrder = {
  id: "order-1", reference: "ORDER-EXAMPLE", name: "Ada", email: "ada@example.com", amount: 11200, ticketAmount: 10000, serviceFee: 1200, paidAt: new Date("2026-10-01T12:00:00Z"), event,
  attendees: [
    { ticketId: "TCK-FIRST", name: "Ada", checkInStatus: false, ticketStatus: "active", amountPaid: 5000, ticketType: { name: "Regular" } },
    { ticketId: "TCK-SECOND", name: "Ada", checkInStatus: false, ticketStatus: "active", amountPaid: 5000, ticketType: { name: "Regular" } },
  ], items: [{ quantity: 2, unitPrice: 5000, ticketType: { name: "Regular" } }],
};

test("event instants use the event timezone, including DST and 12-hour legacy times", () => {
  assert.equal(eventInstant(event.date, "18:00", "Africa/Lagos").toISOString(), "2026-11-14T17:00:00.000Z");
  assert.equal(eventInstant(event.date, "6:00 PM", "Africa/Lagos").toISOString(), "2026-11-14T17:00:00.000Z");
  assert.equal(eventInstant("2026-07-01", "18:00", "America/New_York").toISOString(), "2026-07-01T22:00:00.000Z");
  assert.equal(eventInstant("2026-12-01", "18:00", "America/New_York").toISOString(), "2026-12-01T23:00:00.000Z");
  assert.throws(() => eventInstant("2026-03-08", "02:30", "America/New_York"));
  assert.throws(() => eventInstant(event.date, "25:00", "Africa/Lagos"));
  assert.throws(() => eventInstant(event.date, "18:00", "Invalid/Zone"));
  assert.throws(() => eventInstant("2026-02-30", "18:00", "Africa/Lagos"));
  assert.throws(() => eventInstant(event.date, "13:00 PM", "Africa/Lagos"));
});

test("all seven requested milestones have correct UTC times; missed milestones are not backfilled", () => {
  const jobs = reminderSchedule(event, new Date("2026-10-01T00:00:00Z"));
  assert.deepEqual(jobs.map((job) => job.scheduledAt.toISOString()), [
    "2026-11-07T17:00:00.000Z", "2026-11-11T17:00:00.000Z", "2026-11-13T17:00:00.000Z",
    "2026-11-14T14:00:00.000Z", "2026-11-14T16:30:00.000Z", "2026-11-14T17:00:00.000Z", "2026-11-14T23:00:00.000Z",
  ]);
  const lateBooking = reminderSchedule(event, new Date("2026-11-14T16:45:00Z"));
  assert.deepEqual(lateBooking.map((job) => job.kind), ["event_started", "event_follow_up"]);
  assert.equal(jobs[4].expiresAt.toISOString(), "2026-11-14T16:45:00.000Z");
});

test("receipt has every ticket, a distinct real PNG QR attachment, all fees, timezone, and branding", async () => {
  const email = await bookingEmail(order);
  assert.equal(email.from, "Tickety <experience@tickety.africa>");
  assert.equal(email.attachments?.length, 2);
  assert.notEqual(email.attachments![0].content, email.attachments![1].content);
  assert.equal(Buffer.from(email.attachments![0].content, "base64").subarray(1, 4).toString(), "PNG");
  for (const value of ["TCK-FIRST", "TCK-SECOND", "Service fee", "11,200", "Africa/Lagos", "Muri Okunola Park", "images/logo/logos.png", "cid:ticket-0", "cid:ticket-1"]) assert.ok(email.html.includes(value), value);
  assert.ok(email.text.includes("ORDER-EXAMPLE"));
  assert.ok(!email.headers?.["List-Unsubscribe"], "receipts must not be turned off with event reminders");
  const free = await bookingEmail({ ...order, amount: 0, ticketAmount: 0, serviceFee: 0 });
  assert.ok(free.text.includes("Free booking"));
});

test("guest-controlled text is escaped and admin/organiser alerts do not disclose QR codes", async () => {
  assert.equal(escapeHtml('<script>"&'), '&lt;script&gt;&quot;&amp;');
  const hostile = await bookingEmail({ ...order, name: '<img src=x onerror="alert(1)">' });
  assert.ok(!hostile.html.includes('<img src=x'));
  const admin = bookingAlert(order, "hello@tickety.africa", true);
  assert.deepEqual(admin.to, ["hello@tickety.africa"]);
  assert.ok(!admin.html.includes("TCK-FIRST"));
  assert.ok(admin.html.includes('/admin'));
});

test("follow-up distinguishes scanned guests, no-shows, subscribers, and mixed-ticket bookings", () => {
  const missed = lifecycleEmail(event, order.email, "event_follow_up", "opaque-token", [order]);
  assert.ok(missed.text.includes("We missed you"));
  const scanned = { ...order, attendees: [{ ...order.attendees[0], checkInStatus: true, ticketStatus: "used" }, order.attendees[1]] };
  const attended = lifecycleEmail(event, order.email, "event_follow_up", "opaque-token", [scanned]);
  assert.ok(attended.text.includes("Thank you for coming"));
  const subscriber = lifecycleEmail(event, order.email, "event_follow_up", "opaque-token", []);
  assert.ok(subscriber.text.includes("Thank you for following"));
  assert.ok(!subscriber.text.includes("We missed you"));
  const legacyGuest = lifecycleEmail(event, order.email, "event_follow_up", "opaque-token", [], [{ ...order.attendees[0], checkInStatus: true }]);
  assert.ok(legacyGuest.text.includes("Thank you for coming"));
  assert.equal(missed.headers?.["List-Unsubscribe-Post"], "List-Unsubscribe=One-Click");
  assert.ok(missed.headers?.["List-Unsubscribe"]?.includes('/api/email/unsubscribe/opaque-token'));
});

test("subscriber reminders link to the event while booked guests can open their tickets", () => {
  const subscriber = lifecycleEmail(event, order.email, "reminder_day", "token", []);
  const holder = lifecycleEmail(event, order.email, "reminder_day", "token", [order]);
  assert.ok(subscriber.text.includes('/events/afrobeats-picnic'));
  assert.ok(holder.text.includes('/tickets/ORDER-EXAMPLE'));
  assert.ok(subscriber.subject.includes("Tomorrow is the day"));
});

test("Resend requests carry the persisted idempotency key; throttling is surfaced for retries", async () => {
  const previous = process.env.RESEND_API_KEY;
  process.env.RESEND_API_KEY = "re_test_placeholder";
  try {
    const request = mock.method(globalThis, "fetch", async (_url: unknown, init?: RequestInit) => {
      assert.equal((init!.headers as Record<string, string>)["Idempotency-Key"], "tickety/job-123");
      assert.equal(JSON.parse(init!.body as string).from, "Tickety <experience@tickety.africa>");
      return new Response(JSON.stringify({ id: "email-123" }), { status: 200 });
    });
    assert.equal(await sendEmail(bookingAlert(order, "hello@tickety.africa", true), "tickety/job-123"), "email-123");
    request.mock.restore();
    mock.method(globalThis, "fetch", async () => new Response('{}', { status: 429, headers: { "retry-after": "120" } }));
    await assert.rejects(sendEmail(bookingAlert(order, "hello@tickety.africa", true), "tickety/job-123"), (error: unknown) => error instanceof EmailProviderError && error.status === 429 && error.retryAfterSeconds === 120);
  } finally {
    mock.restoreAll();
    if (previous === undefined) delete process.env.RESEND_API_KEY; else process.env.RESEND_API_KEY = previous;
  }
});

test("webhooks verify the exact body, allow key rotation signatures, and reject tampering/replays", () => {
  const key = Buffer.from("test-secret-for-webhook-verification");
  const secret = `whsec_${key.toString('base64')}`;
  const body = JSON.stringify({ type: "email.delivered" });
  const now = Date.parse("2026-10-01T12:00:00Z");
  const timestamp = String(now / 1000);
  const signature = createHmac("sha256", key).update(`msg-1.${timestamp}.${body}`).digest("base64");
  const headers = new Headers({ "svix-id": "msg-1", "svix-timestamp": timestamp, "svix-signature": `v1,invalid v1,${signature}` });
  assert.ok(verifyEmailWebhook(body, headers, secret, now));
  assert.ok(!verifyEmailWebhook(`${body} `, headers, secret, now));
  assert.ok(!verifyEmailWebhook(body, headers, secret, now + 301_000));
  assert.ok(!verifyEmailWebhook(body, new Headers(), secret, now));
});

test("hard bounces and complaints suppress recipients; temporary bounces do not", () => {
  assert.ok(shouldSuppressEmail("bounced", "Permanent"));
  assert.ok(shouldSuppressEmail("complained"));
  assert.ok(shouldSuppressEmail("suppressed"));
  assert.ok(!shouldSuppressEmail("bounced", "Transient"));
  assert.ok(!shouldSuppressEmail("bounced", "Undetermined"));
  assert.ok(!shouldSuppressEmail("delivery_delayed"));
});
