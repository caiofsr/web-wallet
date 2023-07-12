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

  // Criação de ofertas
  await prisma.offer.createMany({
    data: [
      {
        walletCoinId: 1,
        quantity: 1,
      },
      {
        walletCoinId: 2,
        quantity: 2,
      },
      {
        walletCoinId: 3,
        quantity: 3,
      },
      {
        walletCoinId: 4,
        quantity: 4,
      },
      {
        walletCoinId: 1,
        quantity: 5,
      },
      {
        walletCoinId: 3,
        quantity: 6,
      },
    ],
  });
}

seed()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
