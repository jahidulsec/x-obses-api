-- AlterTable
ALTER TABLE `marathon` ADD COLUMN `location` VARCHAR(191) NULL,
    MODIFY `description` TEXT NOT NULL;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;
