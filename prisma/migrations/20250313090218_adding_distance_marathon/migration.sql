/*
  Warnings:

  - Added the required column `distanceKm` to the `marathon` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `marathon` ADD COLUMN `distanceKm` INTEGER NOT NULL;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;
