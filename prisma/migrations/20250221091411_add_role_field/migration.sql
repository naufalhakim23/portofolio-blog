-- AlterTable
ALTER TABLE "auth"."user" ADD COLUMN     "role" TEXT NOT NULL DEFAULT 'USER';
