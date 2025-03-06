/*
  Warnings:

  - You are about to alter the column `duration` on the `marathon_user` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,2)`.
  - You are about to alter the column `duration` on the `workout` table. The data in that column could be lost. The data in that column will be cast from `VarChar(191)` to `Decimal(10,2)`.
  - You are about to alter the column `daily_duration` on the `workout_goal` table. The data in that column could be lost. The data in that column will be cast from `Int` to `Decimal(8,2)`.

*/
-- AlterTable
ALTER TABLE `marathon_user` MODIFY `duration` DECIMAL(10, 2) NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `workout` MODIFY `duration` DECIMAL(10, 2) NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `workout_goal` MODIFY `daily_duration` DECIMAL(8, 2) NULL;
