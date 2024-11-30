/*
  Warnings:

  - You are about to drop the column `logo` on the `Brand` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Brand` table. All the data in the column will be lost.
  - The primary key for the `User` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[brandRepId]` on the table `Brand` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `brandName` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `brandRepId` to the `Brand` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Brand` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Brand_name_key";

-- AlterTable
ALTER TABLE "Brand" DROP COLUMN "logo",
DROP COLUMN "name",
ADD COLUMN     "brandName" TEXT NOT NULL DEFAULT 'Default Brand Name',
ADD COLUMN     "brandRepId" TEXT NOT NULL DEFAULT 'TemporaryID',
ADD COLUMN     "description" TEXT NOT NULL DEFAULT 'Temporary Description' ,
ADD COLUMN     "otherDetails" TEXT;

-- AlterTable
ALTER TABLE "User" DROP CONSTRAINT "User_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "User_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "User_id_seq";

-- CreateIndex
CREATE UNIQUE INDEX "Brand_brandRepId_key" ON "Brand"("brandRepId");
