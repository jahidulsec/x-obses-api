/*
  Warnings:

  - You are about to drop the column `workout_time` on the `workout` table. All the data in the column will be lost.
  - You are about to drop the column `daily_duration` on the `workout_goal` table. All the data in the column will be lost.
  - You are about to drop the column `days` on the `workout_goal` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[user_id,created_at]` on the table `workout_goal` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `workout` DROP COLUMN `workout_time`;

-- AlterTable
ALTER TABLE `workout_goal` DROP COLUMN `daily_duration`,
    DROP COLUMN `days`,
    ADD COLUMN `end_date` DATETIME(3) NULL,
    ADD COLUMN `start_date` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    ADD COLUMN `workout_days` VARCHAR(191) NULL,
    ADD COLUMN `workout_time` DECIMAL(8, 2) NULL,
    MODIFY `consumption` DECIMAL(8, 2) NULL;

-- CreateIndex
CREATE UNIQUE INDEX `workout_goal_user_id_created_at_key` ON `workout_goal`(`user_id`, `created_at`);
