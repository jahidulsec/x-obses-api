/*
  Warnings:

  - The values [LOGIN,SIGNUP] on the enum `otp_useCase` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `otp` ALTER COLUMN `expiresAt` DROP DEFAULT,
    MODIFY `useCase` ENUM('login', 'signup') NOT NULL;
