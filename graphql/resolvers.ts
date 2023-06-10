// /graphql/resolvers.ts
import prisma from '../lib/prisma'
export const resolvers = {
  Query: {
    devices: () => {
      return prisma.device.findMany()
    },
  },
}