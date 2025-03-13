/*
  Warnings:

  - You are about to drop the column `admin_id` on the `blogs` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `blogs` DROP FOREIGN KEY `blogs_admin_id_fkey`;

-- DropIndex
DROP INDEX `blogs_admin_id_fkey` ON `blogs`;

-- AlterTable
ALTER TABLE `blogs` DROP COLUMN `admin_id`,
    ADD COLUMN `created_by` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AddForeignKey
ALTER TABLE `blogs` ADD CONSTRAINT `blogs_created_by_fkey` FOREIGN KEY (`created_by`) REFERENCES `admin`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;
