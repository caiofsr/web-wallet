import { GetOffersUseCase } from './get-offers';
import { Offer } from '../../entities/offer/offer';
import { InMemoryOfferRepository } from '../../../../test/repositories/in-memory-offer-repository';

describe('Get Offers Use Case', () => {
  let getOffersUseCase: GetOffersUseCase;

  const offerRepository = new InMemoryOfferRepository();

  beforeAll(async () => {
    for (let i = 0; i < 15; i++) {
      await delay(50);
      offerRepository.create(new Offer({ quantity: 1, walletCoinId: 1 }));
    }

    getOffersUseCase = new GetOffersUseCase(offerRepository);
  });

  it('should get the first page of offers', async () => {
    const limit = 10;
    const offers = await getOffersUseCase.execute(1, limit);

    expect(offers.length).toEqual(10);
  });

  it('should get the second page of offers', async () => {
    const limit = 10;
    const offers = await getOffersUseCase.execute(2, limit);

    expect(offers.length).toEqual(5);
  });
});

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
