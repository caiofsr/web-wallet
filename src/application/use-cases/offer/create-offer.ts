import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Offer } from '@application/entities/offer/offer';
import { OfferRepository } from '../../repositories/offer-repository';
import { WalletCoinRepository } from '@application/repositories/wallet-coin-repository';

export interface CreateOfferRequest {
  quantity: number;
  walletCoinId: number;
}

@Injectable()
export class CreateOffersUseCase {
  constructor(
    private offerRepository: OfferRepository,
    private walletCoinRepository: WalletCoinRepository,
  ) {}
  private MAX_OFFERS_PER_DAY = 5;

  async execute(
    { quantity, walletCoinId }: CreateOfferRequest,
    userId: number,
  ) {
    if (quantity <= 0) {
      throw new BadRequestException('Quantity must be positive.');
    }

    const walletCoin = await this.walletCoinRepository.findById(
      walletCoinId,
      userId,
    );

    if (!walletCoin) {
      throw new NotFoundException('WalletCoin not found.');
    }

    if (quantity > walletCoin.balance) {
      throw new BadRequestException('Insufficient balance.');
    }

    const dayOffers = await this.offerRepository.getCountOffers(walletCoinId);

    if (dayOffers >= this.MAX_OFFERS_PER_DAY) {
      throw new BadRequestException('Today offers limit exceeded.');
    }

    return await this.offerRepository.create(
      new Offer({ quantity, walletCoinId }),
    );
  }
}
