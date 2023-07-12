import { Offer } from '@application/entities/offer/offer';

export class OfferViewModel {
  static toHttpArray(offers: Offer[]) {
    return offers.map((offer) => ({
      id: offer.id,
      quantity: offer.quantity,
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
    }));
  }

  static toHttp(offer: Offer) {
    return {
      id: offer.id,
      quantity: offer.quantity,
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
    };
  }
}
