/*
  Warnings:

  - You are about to drop the column `number` on the `Bus` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id,userId]` on the table `Bus` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[busNumber,userId]` on the table `Bus` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `busNumber` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `driverName` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Bus` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Bus` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "BusStatus" AS ENUM ('ACTIVE', 'INACTIVE', 'MAINTENANCE');

-- AlterTable
ALTER TABLE "Bus" DROP COLUMN "number",
ADD COLUMN     "busNumber" TEXT NOT NULL,
ADD COLUMN     "driverName" TEXT NOT NULL,
ADD COLUMN     "status" "BusStatus" NOT NULL DEFAULT 'ACTIVE',
ADD COLUMN     "type" TEXT NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Trip" ADD COLUMN     "driverId" TEXT,
ADD COLUMN     "notes" TEXT,
ADD COLUMN     "travelTime" INTEGER;

-- CreateTable
CREATE TABLE "Staff" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "Staff_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Staff_userId_idx" ON "Staff"("userId");

-- CreateIndex
CREATE INDEX "Bus_userId_idx" ON "Bus"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Bus_id_userId_key" ON "Bus"("id", "userId");

-- CreateIndex
CREATE UNIQUE INDEX "Bus_busNumber_userId_key" ON "Bus"("busNumber", "userId");

-- CreateIndex
CREATE INDEX "Route_userId_idx" ON "Route"("userId");

-- CreateIndex
CREATE INDEX "Trip_userId_idx" ON "Trip"("userId");

-- CreateIndex
CREATE INDEX "Trip_busId_idx" ON "Trip"("busId");

-- CreateIndex
CREATE INDEX "Trip_routeId_idx" ON "Trip"("routeId");

-- AddForeignKey
ALTER TABLE "Staff" ADD CONSTRAINT "Staff_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
