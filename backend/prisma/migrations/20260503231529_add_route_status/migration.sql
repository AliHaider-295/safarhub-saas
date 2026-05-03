-- CreateEnum
CREATE TYPE "RouteStatus" AS ENUM ('ACTIVE', 'INACTIVE');

-- AlterTable
ALTER TABLE "Route" ADD COLUMN     "status" "RouteStatus" NOT NULL DEFAULT 'ACTIVE';
