import { PrismaClient } from '@prisma/client';
import { GraphQLError } from 'graphql';

import { errors } from '../definitions';

const doesDeviceExistByIpAddress = async (
  prisma: PrismaClient,
  ipAddress: string,
): Promise<void> => {
  const doesDeviceExist = await prisma.device.findUnique({
    where: {
      ip: ipAddress,
    },
  });

  //* IP addresses much be unique, so throw error accordingly
  if (doesDeviceExist) {
    const error = errors.deviceConflict(ipAddress).friendlyMessage;

    // TODO: Add logging for full error
    throw new GraphQLError(error);
  }
};

export default doesDeviceExistByIpAddress;
