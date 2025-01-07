/*
  Warnings:

  - You are about to drop the column `dateConverter` on the `ticket` table. All the data in the column will be lost.
  - You are about to drop the column `uid` on the `ticket` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `ticket` DROP COLUMN `dateConverter`,
    DROP COLUMN `uid`,
    ADD COLUMN `dateOuverture` DATETIME(3) NULL;
