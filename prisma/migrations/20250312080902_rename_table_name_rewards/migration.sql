/*
  Warnings:

  - You are about to drop the `Rewards` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `Rewards` DROP FOREIGN KEY `Rewards_marathon_id_fkey`;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- DropTable
DROP TABLE `Rewards`;

-- CreateTable
CREATE TABLE `rewards` (
    `id` VARCHAR(191) NOT NULL,
    `text` VARCHAR(191) NOT NULL,
    `marathon_id` VARCHAR(191) NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `rewards` ADD CONSTRAINT `rewards_marathon_id_fkey` FOREIGN KEY (`marathon_id`) REFERENCES `marathon`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
