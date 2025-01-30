/*
  Warnings:

  - A unique constraint covering the columns `[twitter_user_id]` on the table `Influencer` will be added. If there are existing duplicate values, this will fail.
  - Made the column `twitter_user_id` on table `Influencer` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Influencer" ALTER COLUMN "twitter_user_id" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Influencer_twitter_user_id_key" ON "Influencer"("twitter_user_id");
