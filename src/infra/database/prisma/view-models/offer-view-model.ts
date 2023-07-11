import { Offer } from '@application/entities/offer/offer';

export class OfferViewModel {
  static toHttp(offers: Offer[]) {
    return offers.map((offer) => ({
      id: offer.id,
      quantity: offer.quantity,
      createdAt: offer.createdAt,
      updatedAt: offer.updatedAt,
    }));
  }
}
