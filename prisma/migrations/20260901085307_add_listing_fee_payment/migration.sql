-- CreateTable
CREATE TABLE "ListingFeePayment" (
    "id" TEXT NOT NULL,
    "eventId" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "paystackRef" TEXT NOT NULL,
    "status" "PaymentStatus" NOT NULL DEFAULT 'pending',
    "paidAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ListingFeePayment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ListingFeePayment_eventId_key" ON "ListingFeePayment"("eventId");

-- CreateIndex
CREATE UNIQUE INDEX "ListingFeePayment_paystackRef_key" ON "ListingFeePayment"("paystackRef");

-- AddForeignKey
ALTER TABLE "ListingFeePayment" ADD CONSTRAINT "ListingFeePayment_eventId_fkey" FOREIGN KEY ("eventId") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;
