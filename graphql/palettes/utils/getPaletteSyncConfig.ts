import { Prisma, PrismaClient } from '@prisma/client';
import { getAllEffectsDetails } from 'graphql/nanoleafAuthToken/utils';

interface GetPaletteSyncConfigArgs {
  ip: string;
  prisma: PrismaClient;
  token: string;
  userId: string;
}

const getPaletteSyncConfig = async ({
  ip,
  prisma,
  token,
  userId,
}: GetPaletteSyncConfigArgs): Promise<Prisma.PaletteCreateNestedManyWithoutDevicesInput> => {
  const effectsDetails = await getAllEffectsDetails(ip, token);

  const paletteCheck = await Promise.all(
    effectsDetails.map(async ({ animName }) => {
      const doesPaletteExist = await prisma.palette.findUnique({
        where: { name: animName },
      });
      if (doesPaletteExist === null) {
        return false;
      }

      return true;
    }),
  );

  const connectPalettes = effectsDetails.filter(
    (_element, index) => paletteCheck[index],
  );

  const createPalettes = effectsDetails.filter(({ animName }) =>
    connectPalettes.find((palette) => palette.animName === animName)
      ? false
      : true,
  );

  // Remove invalid first element in array
  createPalettes.splice(0, 1);

  const paletteConfig = {
    connect: connectPalettes.map(({ animName }) => ({
      name: animName,
    })),
    create: createPalettes.map(({ animName, palette }) => ({
      name: animName,
      colors: JSON.stringify(palette),
      user: {
        connect: {
          id: userId,
        },
      },
    })),
  };

  return paletteConfig;
};

export default getPaletteSyncConfig;
