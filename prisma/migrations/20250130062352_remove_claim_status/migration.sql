-- Step 1: Add a temporary new column with the correct type
ALTER TABLE "Claim" ADD COLUMN "new_status" TEXT NOT NULL DEFAULT 'Pending';

-- Step 2: Copy existing data from the old `status` column to `new_status`
UPDATE "Claim" SET "new_status" = status::TEXT;

-- Step 3: Drop the old `status` column (after copying data)
ALTER TABLE "Claim" DROP COLUMN "status";

-- Step 4: Rename `new_status` to `status`
ALTER TABLE "Claim" RENAME COLUMN "new_status" TO "status";

-- Step 5: Drop the old enum type (if it exists)
DROP TYPE "ClaimStatus";

