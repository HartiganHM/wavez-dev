import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

import { device, nanoleafAuthToken, nanoleafProperties, palettes } from 'data';

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

  await prisma.device.createMany({
    data: device.map((device, index) => {
      const paletteConfig =
        index === 0
          ? {
              create: palettes,
            }
          : {
              connect: palettes.map(({ name }) => ({ name })),
            };

      return {
        ...device,
        userId: user.id,
        nanoleafAuthToken: {
          create: {
            token: nanoleafAuthToken[index].token,
          },
        },
        nanoleafProperties: {
          create: {
            ...nanoleafProperties[index],
          },
        },
        palletes: paletteConfig,
      };
    }),
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
