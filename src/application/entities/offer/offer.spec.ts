import { Offer } from './offer';

describe('Offer', () => {
  it('should be able to create a new offer', () => {
    const offer = new Offer({
      quantity: 1,
      walletCoinId: 1,
    });

    expect(offer).toBeTruthy();
    expect(offer.createdAt).toBeTruthy();
  });
});
