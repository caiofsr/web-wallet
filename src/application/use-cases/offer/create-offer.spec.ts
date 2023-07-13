import { Offer } from '../../entities/offer/offer';
import { BadRequestException } from '@nestjs/common';
import { CreateOffersUseCase } from './create-offer';
import { WalletCoin } from '@application/entities/wallet-coin/wallet-coin';
import { InMemoryOfferRepository } from '../../../../test/repositories/in-memory-offer-repository';
import { InMemoryWalletCoinRepository } from '@test/repositories/in-memory-wallet-coin-repository';

describe('Create Offer Use Case', () => {
  let createOfferUseCase: CreateOffersUseCase;

  const offerRepository = new InMemoryOfferRepository();
  const walletCoinRepository = new InMemoryWalletCoinRepository();

  beforeAll(async () => {
    walletCoinRepository.create(new WalletCoin({ balance: 2, coinId: 1, walletId: 1 }, 1));

    createOfferUseCase = new CreateOffersUseCase(offerRepository, walletCoinRepository);
  });

  it('should create an offer', async () => {
    const offer = await createOfferUseCase.execute({ quantity: 2, walletCoinId: 1 }, 1);

    expect(offer).toBeInstanceOf(Offer);
  });

  it('should not create if quantity is less than 1', async () => {
    await expect(createOfferUseCase.execute({ quantity: 0, walletCoinId: 1 }, 1)).rejects.toThrow(
      new BadRequestException('Quantity must be positive.'),
    );
  });

  it('should not create if quantity is greater than balance', async () => {
    await expect(createOfferUseCase.execute({ quantity: 3, walletCoinId: 1 }, 1)).rejects.toThrow(
      new BadRequestException('Insufficient balance.'),
    );
  });

  it('should not create if walletCoinId does not exist', async () => {
    await expect(createOfferUseCase.execute({ quantity: 1, walletCoinId: 2 }, 1)).rejects.toThrow(
      new BadRequestException('WalletCoin not found.'),
    );
  });

  it('should not create if user already create 5 offers on same day', async () => {
    await createOfferUseCase.execute({ quantity: 1, walletCoinId: 1 }, 1);
    await createOfferUseCase.execute({ quantity: 1, walletCoinId: 1 }, 1);
    await createOfferUseCase.execute({ quantity: 1, walletCoinId: 1 }, 1);
    await createOfferUseCase.execute({ quantity: 1, walletCoinId: 1 }, 1);

    await expect(createOfferUseCase.execute({ quantity: 1, walletCoinId: 1 }, 1)).rejects.toThrow(
      new BadRequestException('Today offers limit exceeded.'),
    );
  });
});
