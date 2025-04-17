/*
  Warnings:

  - A unique constraint covering the columns `[user_id,marathon_id]` on the table `marathon_user` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT;

-- CreateIndex
CREATE UNIQUE INDEX `marathon_user_user_id_marathon_id_key` ON `marathon_user`(`user_id`, `marathon_id`);
