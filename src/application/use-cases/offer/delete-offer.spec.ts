import { Offer } from '../../entities/offer/offer';
import { DeleteOfferUseCase } from './delete-offer';
import { InMemoryOfferRepository } from '../../../../test/repositories/in-memory-offer-repository';

describe('Delete Offer Use Case', () => {
  let offer: Offer;
  let deleteOfferUseCase: DeleteOfferUseCase;

  const offerRepository = new InMemoryOfferRepository();

  beforeAll(async () => {
    offer = await offerRepository.create(
      new Offer({ quantity: 1, walletCoinId: 1 }),
    );

    deleteOfferUseCase = new DeleteOfferUseCase(offerRepository);
  });

  it('should delete an offer', () => {
    expect(offerRepository.offers).toHaveLength(1);

    deleteOfferUseCase.execute(offer.id, 1);

    expect(offerRepository.offers.at(0).deletedAt).not.toBeNull();
  });
});
