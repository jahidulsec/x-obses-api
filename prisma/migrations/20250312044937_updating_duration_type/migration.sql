/*
  Warnings:

  - You are about to alter the column `duration` on the `marathon_user` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `Int`.
  - You are about to alter the column `duration` on the `workout` table. The data in that column could be lost. The data in that column will be cast from `Decimal(14,2)` to `Int`.
  - You are about to drop the column `consumption` on the `workout_goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `marathon_user` MODIFY `duration` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `workout` MODIFY `duration` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `workout_goal` DROP COLUMN `consumption`,
    ADD COLUMN `calories_goal` INTEGER NULL;
