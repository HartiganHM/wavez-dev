/*
  Warnings:

  - You are about to drop the column `nanoleafAuthTokenId` on the `Device` table. All the data in the column will be lost.
  - You are about to drop the column `nanoleafPropertiesId` on the `Device` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Device_nanoleafAuthTokenId_key";

-- DropIndex
DROP INDEX "Device_nanoleafPropertiesId_key";

-- AlterTable
ALTER TABLE "Device" DROP COLUMN "nanoleafAuthTokenId",
DROP COLUMN "nanoleafPropertiesId";
