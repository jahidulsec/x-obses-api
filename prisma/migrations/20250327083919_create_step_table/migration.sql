/*
  Warnings:

  - You are about to drop the column `steps` on the `workout` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `workout` DROP COLUMN `steps`;

-- CreateTable
CREATE TABLE `steps` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `steps` INTEGER NOT NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `steps` ADD CONSTRAINT `steps_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
