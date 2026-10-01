-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "timezone" TEXT NOT NULL DEFAULT 'Africa/Lagos';

-- CreateTable
CREATE TABLE "EmailNotification" (
    "id" TEXT NOT NULL,
    "dedupeKey" TEXT NOT NULL,
    "kind" TEXT NOT NULL,
    "recipient" TEXT NOT NULL,
    "eventId" TEXT,
    "orderId" TEXT,
    "userId" TEXT,
    "invitationId" TEXT,
    "preferenceId" TEXT,
    "context" JSONB,
    "payload" JSONB,
    "scheduledAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "availableAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expiresAt" TIMESTAMP(3),
    "status" TEXT NOT NULL DEFAULT 'queued',
    "attempts" INTEGER NOT NULL DEFAULT 0,
    "lockToken" TEXT,
    "lockedUntil" TIMESTAMP(3),
    "firstAttemptAt" TIMESTAMP(3),
    "providerId" TEXT,
    "deliveryStatus" TEXT,
    "deliveryUpdatedAt" TIMESTAMP(3),
    "sentAt" TIMESTAMP(3),
    "lastError" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailNotification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventEmailPreference" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "verifiedAt" TIMESTAMP(3),
    "verificationToken" TEXT NOT NULL,
    "verificationExpiresAt" TIMESTAMP(3),
    "confirmationRequestedAt" TIMESTAMP(3),
    "token" TEXT NOT NULL,
    "unsubscribedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventEmailPreference_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSuppression" (
    "email" TEXT NOT NULL,
    "reason" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailSuppression_pkey" PRIMARY KEY ("email")
);

-- CreateTable
CREATE TABLE "EmailWorkerLease" (
    "id" TEXT NOT NULL,
    "token" TEXT,
    "lockedUntil" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailWorkerLease_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailDeliveryEvent" (
    "id" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "occurredAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailDeliveryEvent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailSubscriptionRateLimit" (
    "key" TEXT NOT NULL,
    "requests" INTEGER NOT NULL DEFAULT 1,
    "expiresAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailSubscriptionRateLimit_pkey" PRIMARY KEY ("key")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailNotification_dedupeKey_key" ON "EmailNotification"("dedupeKey");

-- CreateIndex
CREATE UNIQUE INDEX "EmailNotification_providerId_key" ON "EmailNotification"("providerId");

-- CreateIndex
CREATE INDEX "EmailNotification_status_availableAt_idx" ON "EmailNotification"("status", "availableAt");

-- CreateIndex
CREATE INDEX "EmailNotification_orderId_idx" ON "EmailNotification"("orderId");

-- CreateIndex
CREATE INDEX "EmailNotification_eventId_kind_idx" ON "EmailNotification"("eventId", "kind");

-- CreateIndex
CREATE UNIQUE INDEX "EventEmailPreference_verificationToken_key" ON "EventEmailPreference"("verificationToken");

-- CreateIndex
CREATE UNIQUE INDEX "EventEmailPreference_token_key" ON "EventEmailPreference"("token");

-- CreateIndex
CREATE UNIQUE INDEX "EventEmailPreference_eventId_email_key" ON "EventEmailPreference"("eventId", "email");

-- CreateIndex
CREATE INDEX "EmailDeliveryEvent_providerId_occurredAt_idx" ON "EmailDeliveryEvent"("providerId", "occurredAt");

-- CreateIndex
CREATE INDEX "EmailSubscriptionRateLimit_expiresAt_idx" ON "EmailSubscriptionRateLimit"("expiresAt");

-- AddForeignKey
ALTER TABLE "EmailNotification" ADD CONSTRAINT "EmailNotification_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "EventEmailPreference" ADD CONSTRAINT "EventEmailPreference_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
