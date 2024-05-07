import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      name: 'Sally',
      email: 'sally@test1.com',
      age: 27,
      role: 'admin',
      userPreference: {
        create: {
          emailUpdates: false,
        },
      },
    },
    include: {
      userPreference: true,
    },
  });

  const users = await prisma.user.findMany({
    where: {
      AND: [{ name: 'Sally' }],
    },
    // pagination
    take: 2,
    skip: 1,
  });

  console.log({ users });
}

main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect()
  });