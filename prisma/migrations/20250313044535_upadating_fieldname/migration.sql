/*
  Warnings:

  - You are about to drop the column `distance` on the `marathon_user` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `marathon_user` table. All the data in the column will be lost.
  - You are about to drop the column `distance` on the `workout` table. All the data in the column will be lost.
  - You are about to drop the column `duration` on the `workout` table. All the data in the column will be lost.
  - You are about to drop the column `workout_time` on the `workout_goal` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `marathon_user` DROP COLUMN `distance`,
    DROP COLUMN `duration`,
    ADD COLUMN `distance_km` DECIMAL(8, 2) NULL DEFAULT 0,
    ADD COLUMN `duration_ms` INTEGER NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `workout` DROP COLUMN `distance`,
    DROP COLUMN `duration`,
    ADD COLUMN `distance_km` DECIMAL(10, 3) NOT NULL DEFAULT 0,
    ADD COLUMN `duration_ms` INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE `workout_goal` DROP COLUMN `workout_time`,
    ADD COLUMN `workout_time_ms` DECIMAL(14, 2) NULL;
