// const prisma = new PrismaClient();
// async function main() {
//   const alice = await prisma.user.upsert({
//     // where: { name: 'alice@prisma.io' },
//     update: {},
//     create: {
//       email: 'alice@prisma.io',
//       name: 'Alice',
//       posts: {
//         create: {
//           title: 'Check out Prisma with Next.js',
//           content: 'https://www.prisma.io/nextjs',
//           published: true,
//         },
//       },
//     },
//   });

//   console.log({ alice });
// }
// main()
//   .then(async () => {
//     await prisma.$disconnect();
//   })
//   .catch(async (e) => {
//     console.error(e);
//     await prisma.$disconnect();
//     process.exit(1);
//   });

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seed() {
  // Criação de usuários
  const user1 = await prisma.user.create({
    data: {
      name: 'John Doe',
    },
  });

  const user2 = await prisma.user.create({
    data: {
      name: 'Jane Smith',
    },
  });

  // Criação de carteiras
  const wallet1 = await prisma.wallet.create({
    data: {
      name: 'John Doe Wallet',
      userId: user1.id,
    },
  });

  const wallet2 = await prisma.wallet.create({
    data: {
      name: 'Jane Smith Wallet',
      userId: user2.id,
    },
  });

  // Criação de moedas
  const coin1 = await prisma.coin.create({
    data: {
      name: 'Bitcoin',
      token: 'BTC',
    },
  });

  const coin2 = await prisma.coin.create({
    data: {
      name: 'Ethereum',
      token: 'ETH',
    },
  });

  // Associação de moedas com carteiras
  await prisma.walletCoin.createMany({
    data: [
      {
        walletId: wallet1.id,
        coinId: coin1.id,
        balance: 10,
      },
      {
        walletId: wallet1.id,
        coinId: coin2.id,
        balance: 5,
      },
      {
        walletId: wallet2.id,
        coinId: coin2.id,
        balance: 5,
      },
      {
        walletId: wallet2.id,
        coinId: coin1.id,
        balance: 25,
      },
    ],
    skipDuplicates: true,
  });
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
