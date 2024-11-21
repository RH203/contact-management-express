/*
  Warnings:

  - You are about to drop the column `token_active` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `token_inactive` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users` DROP COLUMN `token_active`,
    DROP COLUMN `token_inactive`;
