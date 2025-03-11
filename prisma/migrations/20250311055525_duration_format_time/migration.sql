/*
  Warnings:

  - You are about to drop the column `workout_time` on the `workout_goal` table. All the data in the column will be lost.
  - Made the column `distance` on table `marathon_user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `marathon_user` required. This step will fail if there are existing NULL values in that column.
  - Made the column `calories` on table `workout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `distance` on table `workout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `heart_pts` on table `workout` required. This step will fail if there are existing NULL values in that column.
  - Made the column `duration` on table `workout` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `workoutTime` to the `workout_goal` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `marathon_user` MODIFY `distance` DECIMAL(8, 2) NOT NULL DEFAULT 0,
    MODIFY `duration` TIME NOT NULL;

-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- AlterTable
ALTER TABLE `workout` MODIFY `calories` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `distance` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `heart_pts` DECIMAL(10, 2) NOT NULL DEFAULT 0,
    MODIFY `duration` TIME NOT NULL;

-- AlterTable
ALTER TABLE `workout_goal` DROP COLUMN `workout_time`,
    ADD COLUMN `workoutTime` TIME NOT NULL;
