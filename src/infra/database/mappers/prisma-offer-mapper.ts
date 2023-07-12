import { Offer } from '@application/entities/offer/offer';
import { Offer as RawPrismaOffer } from '@prisma/client';

export interface RawPrismaOfferWithWalletCoin extends RawPrismaOffer {
  walletCoin: {
    coin: {
      name: string;
      token: string;
    };
  };
}
export class PrismaOfferMapper {
  static toPrisma(offer: Offer) {
    return {
      offer: {
        id: offer.id,
        quantity: offer.quantity,
        createdAt: offer.createdAt,
        updatedAt: offer.updatedAt,
        deletedAt: offer.deletedAt,
      },
      walletCoinId: offer.walletCoinId,
    };
  }

  static toDomainArray(rawOffers: RawPrismaOfferWithWalletCoin[]) {
    return rawOffers.map(
      (rawOffer) =>
        new Offer(
          {
            quantity: rawOffer.quantity,
            walletCoinId: rawOffer.walletCoinId,
            createdAt: rawOffer.createdAt,
            updatedAt: rawOffer.updatedAt,
            deletedAt: rawOffer.deletedAt,
            coinName: rawOffer.walletCoin.coin.name,
            coinToken: rawOffer.walletCoin.coin.token,
          },
          rawOffer.id,
        ),
    );
  }

  static toDomain(rawOffer: RawPrismaOffer) {
    return new Offer(
      {
        quantity: rawOffer.quantity,
        walletCoinId: rawOffer.walletCoinId,
        createdAt: rawOffer.createdAt,
        updatedAt: rawOffer.updatedAt,
        deletedAt: rawOffer.deletedAt,
      },
      rawOffer.id,
    );
  }
}
