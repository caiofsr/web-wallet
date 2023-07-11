import { Injectable } from '@nestjs/common';
import { OfferRepository } from '../../repositories/offer-repository';

@Injectable()
export class GetOffersUseCase {
  constructor(private offerRepository: OfferRepository) {}

  async execute(page: number, limit: number) {
    return await this.offerRepository.findAll(page, limit);
  }
}
