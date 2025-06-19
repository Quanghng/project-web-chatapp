/*
  Warnings:

  - You are about to drop the column `postId` on the `comments` table. All the data in the column will be lost.
  - You are about to drop the `posts` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `threadId` to the `comments` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "comments" DROP CONSTRAINT "comments_postId_fkey";

-- DropForeignKey
ALTER TABLE "posts" DROP CONSTRAINT "posts_userId_fkey";

-- AlterTable
ALTER TABLE "comments" DROP COLUMN "postId",
ADD COLUMN     "threadId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "posts";

-- CreateTable
CREATE TABLE "threads" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "content" TEXT NOT NULL,
    "likes" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "threads_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "threads" ADD CONSTRAINT "threads_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "comments" ADD CONSTRAINT "comments_threadId_fkey" FOREIGN KEY ("threadId") REFERENCES "threads"("id") ON DELETE CASCADE ON UPDATE CASCADE;
