import { createHmac, timingSafeEqual } from "crypto";

// Resend uses the Standard Webhooks (Svix) signature format.
export function verifyEmailWebhook(body: string, headers: Headers, secret: string, now = Date.now()) {
  const id = headers.get("svix-id");
  const timestamp = headers.get("svix-timestamp");
  const signatures = headers.get("svix-signature");
  if (!id || !timestamp || !signatures || !/^\d+$/.test(timestamp) || Math.abs(now / 1000 - Number(timestamp)) > 300) return false;
  const key = Buffer.from(secret.replace(/^whsec_/, ""), "base64");
  if (!key.length) return false;
  const expected = createHmac("sha256", key).update(`${id}.${timestamp}.${body}`).digest();
  return signatures.split(" ").some((entry) => {
    const [version, signature] = entry.split(",");
    if (version !== "v1" || !signature) return false;
    const received = Buffer.from(signature, "base64");
    return received.length === expected.length && timingSafeEqual(received, expected);
  });
}

export function shouldSuppressEmail(status: string, bounceType?: string) {
  return status === "complained" || status === "suppressed" ||
    (status === "bounced" && ["permanent", "hard"].includes(bounceType?.toLowerCase() || ""));
}
