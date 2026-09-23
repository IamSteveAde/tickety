import crypto from "crypto";

interface VerificationPayload {
  userId: string;
  bankCode: string;
  accountNumber: string;
  accountName: string;
  exp: number;
}

function getSecret() {
  const secret = process.env.NEXTAUTH_SECRET;

  if (!secret) {
    throw new Error("NEXTAUTH_SECRET is not set");
  }

  return secret;
}

function base64UrlEncode(value: string) {
  return Buffer.from(value).toString("base64url");
}

function base64UrlDecode(value: string) {
  return Buffer.from(value, "base64url").toString("utf8");
}

function createSignature(payload: string) {
  return crypto
    .createHmac("sha256", getSecret())
    .update(payload)
    .digest("base64url");
}

export function createPayoutVerificationToken(
  data: Omit<VerificationPayload, "exp">
) {
  const payload: VerificationPayload = {
    ...data,
    // Verification remains valid for 10 minutes.
    exp: Date.now() + 10 * 60 * 1000,
  };

  const encodedPayload = base64UrlEncode(JSON.stringify(payload));
  const signature = createSignature(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

export function verifyPayoutVerificationToken(token: string) {
  try {
    const [encodedPayload, signature] = token.split(".");

    if (!encodedPayload || !signature) {
      return null;
    }

    const expectedSignature = createSignature(encodedPayload);

    const signaturesMatch = crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );

    if (!signaturesMatch) {
      return null;
    }

    const payload = JSON.parse(
      base64UrlDecode(encodedPayload)
    ) as VerificationPayload;

    if (payload.exp < Date.now()) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}