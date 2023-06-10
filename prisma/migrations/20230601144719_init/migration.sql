-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'SUPPORTER', 'ALPHA', 'BETA', 'BASIC');

-- CreateEnum
CREATE TYPE "DeviceType" AS ENUM ('NANOLEAF', 'LIFX', 'HUE');

-- CreateTable
CREATE TABLE "AccessKey" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expireAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "AccessKey_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'BASIC',
    "invites" INTEGER NOT NULL DEFAULT 0,
    "invitedById" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Device" (
    "id" TEXT NOT NULL,
    "ip" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "mac" TEXT NOT NULL,
    "type" "DeviceType" NOT NULL,
    "userId" TEXT NOT NULL,
    "nanoleafAuthTokenId" TEXT,
    "nanoleafPropertiesId" TEXT,
    "lifxPropertiesId" TEXT,
    "huePropertiesId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NanoleafAuthToken" (
    "id" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NanoleafAuthToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "NanoleafProperties" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "serialNo" TEXT NOT NULL,
    "firmwareVersion" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "NanoleafProperties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LifxProperties" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LifxProperties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "HueProperties" (
    "id" TEXT NOT NULL,
    "deviceId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HueProperties_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Palette" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "colors" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Palette_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_DeviceToPalette" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "AccessKey_key_key" ON "AccessKey"("key");

-- CreateIndex
CREATE UNIQUE INDEX "AccessKey_email_key" ON "AccessKey"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_invitedById_key" ON "User"("invitedById");

-- CreateIndex
CREATE UNIQUE INDEX "Device_ip_key" ON "Device"("ip");

-- CreateIndex
CREATE UNIQUE INDEX "Device_name_key" ON "Device"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Device_mac_key" ON "Device"("mac");

-- CreateIndex
CREATE UNIQUE INDEX "Device_nanoleafAuthTokenId_key" ON "Device"("nanoleafAuthTokenId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_nanoleafPropertiesId_key" ON "Device"("nanoleafPropertiesId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_lifxPropertiesId_key" ON "Device"("lifxPropertiesId");

-- CreateIndex
CREATE UNIQUE INDEX "Device_huePropertiesId_key" ON "Device"("huePropertiesId");

-- CreateIndex
CREATE UNIQUE INDEX "NanoleafAuthToken_token_key" ON "NanoleafAuthToken"("token");

-- CreateIndex
CREATE UNIQUE INDEX "NanoleafAuthToken_deviceId_key" ON "NanoleafAuthToken"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "NanoleafProperties_serialNo_key" ON "NanoleafProperties"("serialNo");

-- CreateIndex
CREATE UNIQUE INDEX "NanoleafProperties_deviceId_key" ON "NanoleafProperties"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "LifxProperties_deviceId_key" ON "LifxProperties"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "HueProperties_deviceId_key" ON "HueProperties"("deviceId");

-- CreateIndex
CREATE UNIQUE INDEX "Palette_name_key" ON "Palette"("name");

-- CreateIndex
CREATE UNIQUE INDEX "_DeviceToPalette_AB_unique" ON "_DeviceToPalette"("A", "B");

-- CreateIndex
CREATE INDEX "_DeviceToPalette_B_index" ON "_DeviceToPalette"("B");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_invitedById_fkey" FOREIGN KEY ("invitedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Device" ADD CONSTRAINT "Device_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NanoleafAuthToken" ADD CONSTRAINT "NanoleafAuthToken_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "NanoleafProperties" ADD CONSTRAINT "NanoleafProperties_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LifxProperties" ADD CONSTRAINT "LifxProperties_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HueProperties" ADD CONSTRAINT "HueProperties_deviceId_fkey" FOREIGN KEY ("deviceId") REFERENCES "Device"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Palette" ADD CONSTRAINT "Palette_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToPalette" ADD CONSTRAINT "_DeviceToPalette_A_fkey" FOREIGN KEY ("A") REFERENCES "Device"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DeviceToPalette" ADD CONSTRAINT "_DeviceToPalette_B_fkey" FOREIGN KEY ("B") REFERENCES "Palette"("id") ON DELETE CASCADE ON UPDATE CASCADE;
