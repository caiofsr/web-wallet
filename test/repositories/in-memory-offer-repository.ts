import { Offer } from '@application/entities/offer/offer';
import { OfferRepository } from '@application/repositories/offer-repository';

export class InMemoryOfferRepository implements OfferRepository {
  public offers: Offer[] = [];

  async delete(id: number): Promise<void> {
    const offerIndex = this.offers.findIndex((offer) => offer.id === id);

    if (offerIndex >= 0) {
      this.offers[offerIndex].delete();
    }
  }

  async create(offer: Offer): Promise<Offer> {
    this.offers.push(offer);

    return offer;
  }
}
