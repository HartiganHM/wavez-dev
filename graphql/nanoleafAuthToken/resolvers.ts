import prisma from 'lib/prisma';

import { getPaletteSyncConfig } from 'graphql/palettes/utils';
import {
  authenticateWithNanoleafDevice,
  doesDeviceExistByIpAddress,
  getAllPanelProperties,
} from './utils';

import { types } from './definitions';

export const authenticateWithDeviceByUserId = async ({
  device,
  shouldSyncPalettes,
  user,
}: types.AuthenticateWithNanoleafDeviceArgs) => {
  try {
    //* Check to see if a device with the same IP Address already exists
    await doesDeviceExistByIpAddress(prisma, device.ip);

    const token = await authenticateWithNanoleafDevice(device.ip);

    //* Get Panel properties with new auth token
    const { firmwareVersion, name, model, serialNo } =
      await getAllPanelProperties(device.ip, token);

    //* Get all effect details for new device
    const paletteConfig = shouldSyncPalettes
      ? await getPaletteSyncConfig({
          ip: device.ip,
          prisma,
          token,
          userId: user.id,
        })
      : {};

    /**
     * * 1. Create device and connect to use via userId
     * * 2. Create nanoleafAuthroken and connect to device via token
     * * 3. Create nanoleafProperties and connect to device via device
     * * 4. Create many or connect existing palettes to device if shouldSyncPalettes = true
     */
    await prisma.device.create({
      data: {
        ...device,
        type: 'NANOLEAF',
        user: {
          connect: {
            id: user.id,
          },
        },
        nanoleafAuthToken: {
          create: {
            token,
          },
        },
        nanoleafProperties: {
          create: {
            firmwareVersion,
            name,
            model,
            serialNo,
          },
        },
        palettes: paletteConfig,
      },
    });

    return token;
  } catch (error) {
    console.log(error);
    throw new Error('Bad things are bad');
  }
};
