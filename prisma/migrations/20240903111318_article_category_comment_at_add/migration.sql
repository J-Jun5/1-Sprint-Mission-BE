-- AlterTable
ALTER TABLE "Article" ADD COLUMN     "category" TEXT NOT NULL DEFAULT '';

-- AlterTable
ALTER TABLE "Comment" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT Null;
