import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { OfferRepository } from '@application/repositories/offer-repository';
import { PrismaOfferRepository } from './prisma/repositories/offer-repository';
import { WalletCoinRepository } from '@application/repositories/wallet-coin-repository';
import { PrismaWalletCoinRepository } from './prisma/repositories/wallet-coin-repository';

@Module({
  providers: [
    PrismaService,
    { provide: OfferRepository, useClass: PrismaOfferRepository },
    { provide: WalletCoinRepository, useClass: PrismaWalletCoinRepository },
  ],
  exports: [OfferRepository, WalletCoinRepository],
})
export class DatabaseModule {}
