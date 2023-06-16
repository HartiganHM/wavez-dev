import { PrismaClient } from '@prisma/client';
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
    const error = errors.deviceConflict(ipAddress);

    throw new Error(JSON.stringify(error));
  }
};

export default doesDeviceExistByIpAddress;
