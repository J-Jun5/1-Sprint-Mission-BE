/*
  Warnings:

  - You are about to drop the column `category` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `commentcount` on the `Article` table. All the data in the column will be lost.
  - You are about to drop the column `img` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `tags` on the `Product` table. All the data in the column will be lost.
  - Added the required column `productName` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Article" DROP COLUMN "category",
DROP COLUMN "commentcount",
ADD COLUMN     "articleImg" TEXT,
ADD COLUMN     "board" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "commentCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "img",
DROP COLUMN "name",
DROP COLUMN "tags",
ADD COLUMN     "category" TEXT,
ADD COLUMN     "productImg" TEXT,
ADD COLUMN     "productName" VARCHAR(10) NOT NULL,
ADD COLUMN     "productTags" TEXT[];

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "profileImg" TEXT;
