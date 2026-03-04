/*
  Warnings:

  - You are about to drop the column `data` on the `ImgProject` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `ImgProject` table. All the data in the column will be lost.
  - Added the required column `filename` to the `ImgProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `mimeType` to the `ImgProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `order` to the `ImgProject` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `ImgProject` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "ImgProject" DROP CONSTRAINT "ImgProject_projectId_fkey";

-- AlterTable
ALTER TABLE "ImgProject" DROP COLUMN "data",
DROP COLUMN "name",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "filename" TEXT NOT NULL,
ADD COLUMN     "mimeType" TEXT NOT NULL,
ADD COLUMN     "order" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "ImgProject_projectId_idx" ON "ImgProject"("projectId");

-- AddForeignKey
ALTER TABLE "ImgProject" ADD CONSTRAINT "ImgProject_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
