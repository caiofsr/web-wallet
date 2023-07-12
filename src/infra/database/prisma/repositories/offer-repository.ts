import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OfferRepository } from '@application/repositories/offer-repository';
import { Offer } from '@application/entities/offer/offer';
import { PrismaOfferMapper } from '@infra/database/mappers/prisma-offer-mapper';
import { endOfDay, startOfDay } from 'date-fns';

@Injectable()
export class PrismaOfferRepository implements OfferRepository {
  constructor(private prismaService: PrismaService) {}

  async getCountOffers(walletCoinId: number): Promise<number> {
    const startDate = startOfDay(new Date());
    const endDate = endOfDay(new Date());

    const walletCoin = await this.prismaService.walletCoin.findUnique({
      where: { id: walletCoinId },
      select: {
        wallet: {
          select: {
            userId: true,
          },
        },
      },
    });

    const count = await this.prismaService.offer.count({
      where: {
        walletCoin: {
          wallet: {
            userId: walletCoin.wallet.userId,
          },
        },
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
    });

    return count;
  }

  async create(offer: Offer): Promise<Offer> {
    const { offer: raw, walletCoinId } = PrismaOfferMapper.toPrisma(offer);

    const offerPrisma = await this.prismaService.offer.create({
      data: {
        ...raw,
        walletCoinId,
      },
    });

    return PrismaOfferMapper.toDomain(offerPrisma);
  }

  async findAll(page: number, limit: number): Promise<Offer[]> {
    const startDate = startOfDay(new Date());
    const endDate = endOfDay(new Date());

    const offers = await this.prismaService.offer.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where: {
        deletedAt: null,
        createdAt: {
          gte: startDate,
          lt: endDate,
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return PrismaOfferMapper.toDomainArray(offers);
  }

  async delete(id: number, userId: number): Promise<void> {
    const offer = await this.prismaService.offer.findUnique({
      where: { id, deletedAt: null },
      select: {
        deletedAt: true,
        walletCoin: {
          select: {
            wallet: {
              select: {
                userId: true,
              },
            },
          },
        },
      },
    });

    if (!offer) {
      throw new NotFoundException('Offer not found.');
    }

    if (offer.walletCoin.wallet.userId !== userId) {
      throw new ForbiddenException('You are not the owner of this offer.');
    }

    await this.prismaService.offer.update({
      where: {
        id,
      },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
