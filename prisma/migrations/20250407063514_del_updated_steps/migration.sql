/*
  Warnings:

  - You are about to drop the column `updated_at` on the `steps` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `steps` DROP COLUMN `updated_at`;
