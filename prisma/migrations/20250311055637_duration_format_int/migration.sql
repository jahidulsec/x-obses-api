/*
  Warnings:

  - You are about to drop the column `workoutTime` on the `workout_goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `marathon_user` MODIFY `distance` DECIMAL(8, 2) NULL DEFAULT 0,
    MODIFY `duration` DECIMAL(10, 2) NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `workout` MODIFY `calories` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `distance` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `heart_pts` DECIMAL(10, 2) NULL DEFAULT 0,
    MODIFY `duration` DECIMAL(10, 2) NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `workout_goal` DROP COLUMN `workoutTime`,
    ADD COLUMN `workout_time` DECIMAL(8, 2) NULL;
