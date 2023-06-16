import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import {
  device,
  nanoleafAuthToken,
  nanoleafProperties,
  palettes,
} from '../data';

async function main() {
  /**
   * * 1. Create User
   * * 2. Create Left device
   * *   a. Connect user
   * *   b. Create auth token
   * *   c. Create properties
   * *   d. Create palettes
   * * 3. Create Right device
   * *   a. Connect user
   * *   b. Create auth token
   * *   c. Create properties
   * *   d. Connect palettes
   */
  const user = await prisma.user.create({
    data: {
      email: 'hugh@featherweight.design',
      name: 'Hugh Hartigan',
      role: 'ADMIN',
    },
  });

  await prisma.device.create({
    data: {
      ...device[0],
      userId: user.id,
      nanoleafAuthToken: {
        create: {
          token: nanoleafAuthToken[0].token,
        },
      },
      nanoleafProperties: {
        create: {
          ...nanoleafProperties[0],
        },
      },
      palettes: {
        create: palettes.map((palette) => ({
          ...palette,
          user: {
            connect: {
              id: user.id,
            },
          },
        })),
      },
    },
  });

  await prisma.device.create({
    data: {
      ...device[1],
      userId: user.id,
      nanoleafAuthToken: {
        create: {
          token: nanoleafAuthToken[1].token,
        },
      },
      nanoleafProperties: {
        create: {
          ...nanoleafProperties[1],
        },
      },
      palettes: {
        connect: palettes.map(({ name }) => ({ name })),
      },
    },
  });
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
