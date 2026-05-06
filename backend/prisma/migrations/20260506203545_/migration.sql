/*
  Warnings:

  - You are about to drop the `Passenger` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Passenger" DROP CONSTRAINT "Passenger_tripId_fkey";

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "passengers" INTEGER NOT NULL DEFAULT 0;

-- DropTable
DROP TABLE "Passenger";
