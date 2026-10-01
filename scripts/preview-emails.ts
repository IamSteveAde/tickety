import { mkdir, readFile, writeFile } from "node:fs/promises";
import { join } from "node:path";
import { bookingAlert, bookingEmail, lifecycleEmail, simpleEmail, EmailOrder } from "../lib/email/templates";

async function main() {
  const directory = join(process.cwd(), "email-previews");
  await mkdir(directory, { recursive: true });
  const event = { id: "demo-event", slug: "afrobeats-picnic", title: "Afrobeats Picnic — Lagos", date: "2026-11-14", startTime: "18:00", endTime: "23:00", timezone: "Africa/Lagos", venue: "Muri Okunola Park", state: "Lagos, Nigeria", organiser: { name: "Tickety Experiences" } };
  const order: EmailOrder = { id: "demo-order", reference: "DEMO-NOT-A-VALID-TICKET", name: "Ada", email: "preview@example.com", amount: 11200, ticketAmount: 10000, serviceFee: 1200, paidAt: new Date("2026-10-01T12:00:00Z"), event, items: [{ quantity: 2, unitPrice: 5000, ticketType: { name: "Regular" } }], attendees: [1, 2].map((i) => ({ ticketId: `DEMO-TICKET-${i}`, name: "Ada", checkInStatus: false, ticketStatus: "active", amountPaid: 5000, ticketType: { name: "Regular" } })) };
  const samples = {
    booking: await bookingEmail(order),
    organiser: bookingAlert(order, "preview@example.com", false),
    admin: bookingAlert(order, "preview@example.com", true),
    reminder: lifecycleEmail(event, "preview@example.com", "reminder_day", "preview-token", [order]),
    started: lifecycleEmail(event, "preview@example.com", "event_started", "preview-token", [order]),
    thank_you: lifecycleEmail(event, "preview@example.com", "event_follow_up", "preview-token", [{ ...order, attendees: [{ ...order.attendees[0], checkInStatus: true, ticketStatus: "used" }] }]),
    missed_you: lifecycleEmail(event, "preview@example.com", "event_follow_up", "preview-token", [order]),
    subscriber: lifecycleEmail(event, "preview@example.com", "reminder_week", "preview-token", []),
    confirmation: simpleEmail("preview@example.com", "Confirm event updates", "Stay close to the moments you love.", "Confirm email updates for Afrobeats Picnic — Lagos. We’ll keep you updated through the countdown, event start, and follow-up.", "Confirm event updates", "https://tickety.africa/email/confirm/preview-token"),
  };
  const logo = (await readFile(join(process.cwd(), "public/images/logo/logos.png"))).toString("base64");
  for (const [name, email] of Object.entries(samples)) {
    let html = email.html.replace(/https?:\/\/[^" ]+\/images\/logo\/logos\.png/g, `data:image/png;base64,${logo}`);
    for (const attachment of email.attachments || []) {
      if (attachment.content_id) html = html.replace(`cid:${attachment.content_id}`, `data:${attachment.content_type};base64,${attachment.content}`);
    }
    await writeFile(join(directory, `${name}.html`), html);
  }
  await writeFile(join(directory, "index.html"), `<!doctype html><html lang="en"><meta charset="utf-8"><title>Tickety email previews</title><body style="font-family:Arial;background:#f5f2f8;padding:40px;color:#21172f"><h1>Tickety email previews</h1><p>Demo data only. No emails are sent.</p><ul>${Object.keys(samples).map((name) => `<li style="margin:15px 0"><a href="${name}.html">${name.replace(/_/g, ' ')}</a></li>`).join('')}</ul></body></html>`);
  console.log(`Email previews created: ${join(directory, "index.html")}. No emails were sent.`);
}

main().catch((error) => { console.error(error); process.exitCode = 1; });
