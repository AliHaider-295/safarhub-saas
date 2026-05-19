-- AlterTable
ALTER TABLE "User" ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "department" TEXT,
ADD COLUMN     "gender" TEXT,
ADD COLUMN     "joinedAt" TIMESTAMP(3),
ALTER COLUMN "updatedAt" DROP DEFAULT;
