import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { WalletCoin } from '@application/entities/wallet-coin/wallet-coin';
import { WalletCoinRepository } from '@application/repositories/wallet-coin-repository';
import { PrismaWalletCoinMapper } from '@infra/database/mappers/prisma-wallet-coin-mapper';

@Injectable()
export class PrismaWalletCoinRepository implements WalletCoinRepository {
  constructor(private prismaService: PrismaService) {}

  async create(walletCoin: WalletCoin): Promise<WalletCoin> {
    const { walletCoin: raw } = PrismaWalletCoinMapper.toPrisma(walletCoin);

    const offerPrisma = await this.prismaService.walletCoin.create({
      data: {
        ...raw,
      },
    });

    return PrismaWalletCoinMapper.toDomain(offerPrisma);
  }

  async findById(id: number, userId: number): Promise<WalletCoin | null> {
    const walletCoin = await this.prismaService.walletCoin.findUnique({
      where: {
        id,
        wallet: {
          userId,
        },
      },
    });

    if (!walletCoin) {
      return null;
    }

    return PrismaWalletCoinMapper.toDomain(walletCoin);
  }
}
