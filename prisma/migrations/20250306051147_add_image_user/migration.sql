-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `users` ADD COLUMN `image` VARCHAR(255) NULL;
