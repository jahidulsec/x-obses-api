/*
  Warnings:

  - You are about to alter the column `duration` on the `marathon_user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(10,2)` to `Decimal(14,2)`.
  - You are about to alter the column `workout_time` on the `workout_goal` table. The data in that column could be lost. The data in that column will be cast from `Decimal(8,2)` to `Decimal(14,2)`.
  - Made the column `calories` on table `workout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `distance` on table `workout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `heart_pts` on table `workout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `workout` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `marathon_user` MODIFY `duration` DECIMAL(14, 2) NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `workout` MODIFY `calories` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `distance` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `heart_pts` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `duration` DECIMAL(14, 2) NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `workout_goal` MODIFY `workout_time` DECIMAL(14, 2) NULL;
