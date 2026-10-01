export type EmailAttachment = { filename: string; content: string; content_type?: string; content_id?: string };
export type EmailMessage = {
  from: string;
  to: string[];
  reply_to: string;
  subject: string;
  html: string;
  text: string;
  attachments?: EmailAttachment[];
  headers?: Record<string, string>;
};

export class EmailProviderError extends Error {
  constructor(public status: number, public retryAfterSeconds?: number) {
    super(`Resend request failed (HTTP ${status})`);
  }
}

export async function sendEmail(message: EmailMessage, idempotencyKey: string): Promise<string> {
  if (!process.env.RESEND_API_KEY) throw new Error("RESEND_API_KEY is not configured");
  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
      "Idempotency-Key": idempotencyKey,
    },
    body: JSON.stringify(message),
    signal: AbortSignal.timeout(10_000),
  });
  if (!response.ok) {
    const retryAfter = response.headers.get("retry-after");
    throw new EmailProviderError(response.status, retryAfter ? Number(retryAfter) : undefined);
  }
  const result: { id?: string } = await response.json();
  if (!result.id) throw new Error("Resend returned no email ID");
  return result.id;
}
