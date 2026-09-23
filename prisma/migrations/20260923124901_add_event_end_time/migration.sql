-- Add endTime as nullable first so existing events can be updated.
ALTER TABLE "Event"
ADD COLUMN "endTime" TEXT;

-- Give existing events a temporary end time.
UPDATE "Event"
SET "endTime" = '23:59'
WHERE "endTime" IS NULL;

-- Make endTime required after all existing rows have a value.
ALTER TABLE "Event"
ALTER COLUMN "endTime" SET NOT NULL;