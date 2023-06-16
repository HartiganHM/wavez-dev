import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'hugh@featherweight.design',
      name: 'Hugh Hartigan',
      role: 'ADMIN',
    },
  });

  // TODO: Add seed for home Nanoleaf and Access Keys
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
