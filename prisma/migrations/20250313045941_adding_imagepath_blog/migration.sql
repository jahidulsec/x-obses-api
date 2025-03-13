/*
  Warnings:

  - Added the required column `image_path` to the `blogs` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `blogs` ADD COLUMN `image_path` VARCHAR(191) NOT NULL;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;
