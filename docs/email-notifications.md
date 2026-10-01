# Tickety email notifications

All email is sent through the Resend HTTP API as **Tickety <experience@tickety.africa>**, with replies to the same address. No SMTP credentials or client-side API keys are used. The shared HTML templates use Tickety purple, the supplied `/images/logo/logos.png`, mobile-friendly layouts, and a plain-text alternative.

## Enable delivery

1. Verify **tickety.africa** in Resend and add its required SPF/DKIM DNS records. Set up the `experience@tickety.africa` mailbox separately to receive replies. Use a sending API key in `RESEND_API_KEY`.
2. Set `NEXT_PUBLIC_APP_URL=https://tickety.africa`, `ADMIN_NOTIFICATION_EMAILS=hello@tickety.africa`, and a long random `CRON_SECRET` in the deployment environment. Never put the Resend key in a `NEXT_PUBLIC_` variable.
3. Apply the checked-in migration with `npx prisma migrate deploy` and generate Prisma Client with `npx prisma generate` before starting this code. The migration adds the outbox, subscription preferences, delivery records, suppression list, rate-limit buckets, worker lease, and the event timezone. It does not send email or change existing bookings. Existing events default to `Africa/Lagos`; review the timezone of any international events.
4. Configure a Resend webhook pointing to `https://tickety.africa/api/webhooks/resend`. Subscribe to `email.sent`, `email.delivered`, `email.delivery_delayed`, `email.bounced`, `email.complained`, `email.failed`, and `email.suppressed`. Store its signing secret in `RESEND_WEBHOOK_SECRET`. Raw-body signatures and a five-minute timestamp tolerance are verified before processing.
5. Deploy the every-minute cron in `vercel.json`. Vercel sends the bearer token from `CRON_SECRET`. **This frequency requires a Vercel plan supporting per-minute cron jobs**. On another host, schedule an authenticated GET to `/api/cron/emails` every minute with `Authorization: Bearer <CRON_SECRET>`. Never expose that secret in a public URL.
6. For ticket holders who booked before this feature, run `npm run emails:backfill` to review the count, then `npm run emails:backfill -- --apply` to schedule their remaining future updates. This never resends old receipts or booking alerts and preserves existing unsubscribe preferences. There was no subscriber store in the previous application, so any external subscriber lists require a separate consent-preserving import.
7. Make a controlled free booking and a paid test booking. Check the customer’s receipt/QR codes, the organiser’s alert, and `hello@tickety.africa`’s alert. Confirm delivery in both Resend and the outbox. Check a subscription and unsubscribe using addresses you own. Test scan/non-scan follow-ups on test events with short future start/end times.

## Messages and timing

| Trigger | Recipient | Content |
| --- | --- | --- |
| Confirmed paid or free booking | Customer | Receipt, item quantities/prices, service fee, total, payment status, booking reference, full event details, timezone, organiser, and each ticket with its own inline QR PNG attachment |
| Same confirmed booking | Organiser | Customer, event, booking reference, ticket quantities, amount, dashboard link; no QR secrets |
| Same confirmed booking | `hello@tickety.africa` | Booking summary and admin dashboard link; no QR secrets |
| Event subscription | Subscriber | Confirmation link; clicking opens a page requiring an explicit confirmation button |
| Seven days, three days, one day, three hours, thirty minutes before start | Confirmed ticket holders and confirmed subscribers | Branded countdown, event details, ticket/event link, unsubscribe |
| Event start | Same recipients | Event-start notification |
| One hour after event end | Same recipients | Thank-you if any eligible ticket belonging to that email was scanned; “we missed you / hope to see you next time” for unscanned ticket holders; separate wrap-up copy for subscribers without a booking |
| Organiser registration | Organiser | Welcome and dashboard link |
| Event creation | Organiser | Event-created confirmation and dashboard/share-link access |
| Listing-fee confirmation | Organiser | Payment-confirmed/event-live message |
| Staff invitation through either invitation route | Invited staff | Secure, expiring invitation link |

The booking email intentionally combines the confirmation, receipt, and tickets in one message. Every QR encodes the same `ticketId`, `reference`, and `eventId` shape the gate scanner already accepts. Customer QR codes are never copied to the organiser or admin. Ticket PNG attachments are usable if a mail client blocks inline images; the hosted booking link remains available too.

Times are calculated in the event’s stored IANA timezone, independently of the web server’s timezone. The organiser can set it during creation/editing. Invalid dates, timezones, and nonexistent local times during daylight-saving changes are rejected. Existing events use Africa/Lagos until edited. Pending reminder times are adjusted when the event date, start/end time, or timezone changes. Previously sent milestones are not repeated.

A late booking/confirmation receives only future milestones. Countdown/start messages have a fifteen-minute lateness window; outdated milestones are skipped rather than sent as a burst after an outage. Follow-ups expire forty-eight hours after event end. Actual timing is subject to scheduler cadence, queue load, and Resend/mail-provider delivery latency; email cannot guarantee delivery at an exact second.

## Reliability and preferences

- The database outbox is written in the same transaction as ticket issuance for both paid and free bookings. A unique deduplication key prevents duplicate emails when Paystack callbacks/webhooks are repeated. Resend failures after commit cannot roll back a successful booking. New bookings attempt immediate delivery; cron retries any pending work.
- One event/email preference controls lifecycle updates across all bookings for that email. Buying another ticket preserves an unsubscribe. Receipt/ticket and staff-access emails remain transactional.
- Non-booking subscribers explicitly confirm their email before reminders are scheduled. Public requests are limited per IP bucket and per recipient, and a given event/address can request confirmation at most once an hour. Raw IP addresses are not stored. On self-hosted deployments, ensure the reverse proxy overwrites forwarding headers and apply edge rate limits as well.
- Human-facing unsubscribe links first show a preference page. The separate signed-by-opaque-token POST endpoint supports mail-provider one-click unsubscribe. Link scanners cannot unsubscribe or subscribe someone with a GET.
- A database worker lease and per-message claims prevent overlapping workers. Default processing is capped at forty jobs/run and forty-five seconds, with ten-second provider request timeouts and a 600ms gap between requests. This stays below Resend’s default two-request-per-second limit. Monitor queue delay; for large audiences, increase provisioned Resend throughput and move the same queue to a continuously running worker rather than allowing a backlog to miss milestones.
- Transient errors use bounded exponential backoff and `Retry-After`. The exact payload is stored before delivery and reused with the same Resend idempotency key. Since Resend’s key retention is twenty-four hours, ambiguous attempts stop after twenty-three hours and require review, rather than risking a duplicate. Permanent validation errors or ten failed attempts are marked failed.
- Delivered, delayed, bounced, complained, failed, and suppressed states are recorded separately from provider acceptance. Signed webhook events are deduplicated and timestamp-ordered. A hard bounce, complaint, or provider suppression blocks future mail to that address. Email acceptance is not proof of inbox delivery.
- Successful jobs clear their rendered payload and invitation context to minimise retention of QR codes and raw invitation links. Unsent/retry payloads are sensitive and must be protected with normal database access controls. Choose retention policies for sent outbox/delivery records that fit your operations.

## Verify and preview

```bash
npm run test:emails
npx tsc --noEmit --incremental false
npm run lint
npm run emails:preview
```

Open `email-previews/index.html` to review the booking, admin, organiser, countdown, event-start, subscriber, confirmation, thank-you, and missed-you examples. Preview generation uses demo data and embeds local images; it never contacts Resend or your database. The generated directory is gitignored. Unit tests mock delivery/database calls and do not send real email.

Inspect `EmailNotification` in Prisma Studio for `status`, `attempts`, `lastError`, `providerId`, and `deliveryStatus`. Alert on growing due-job age, failed jobs, and worker 5xx responses. For a failed ambiguous delivery, check Resend using the stored provider ID or idempotency key before creating any replacement job. Do not blindly reset failed rows to queued after the idempotency window.

Provider references: [Resend send-email API](https://resend.com/docs/api-reference/emails/send-email), [inline images](https://resend.com/docs/dashboard/emails/embed-inline-images), [idempotency retention](https://resend.com/docs/dashboard/emails/idempotency-keys), [webhook verification](https://resend.com/docs/webhooks/verify-webhooks-requests), [Vercel cron management](https://vercel.com/docs/cron-jobs/manage-cron-jobs).
