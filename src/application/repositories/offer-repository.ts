import { Offer } from '@application/entities/offer/offer';

export abstract class OfferRepository {
  abstract delete(id: number, userId: number): Promise<void>;
  abstract create(offer: Offer): Promise<Offer>;
  abstract findAll(page: number, limit: number): Promise<Offer[]>;
}
