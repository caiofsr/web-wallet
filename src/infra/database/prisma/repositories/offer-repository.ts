import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OfferRepository } from '@application/repositories/offer-repository';
import { Offer } from '@application/entities/offer/offer';

@Injectable()
export class PrismaOfferRepository implements OfferRepository {
  constructor(private prismaService: PrismaService) {}

  create(offer: Offer): Promise<Offer> {
    throw new Error('Method not implemented.');
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
