-- AlterTable
ALTER TABLE "Canvas" ADD COLUMN     "connectionId" INTEGER;

-- CreateTable
CREATE TABLE "Connection" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "host" TEXT NOT NULL,
    "port" INTEGER NOT NULL,
    "user" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "database" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Connection_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Canvas" ADD CONSTRAINT "Canvas_connectionId_fkey" FOREIGN KEY ("connectionId") REFERENCES "Connection"("id") ON DELETE SET NULL ON UPDATE CASCADE;
