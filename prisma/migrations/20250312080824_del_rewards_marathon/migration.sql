/*
  Warnings:

  - You are about to drop the column `rewards` on the `marathon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `marathon` DROP COLUMN `rewards`;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;
