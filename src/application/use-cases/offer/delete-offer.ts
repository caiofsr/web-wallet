import { Injectable } from '@nestjs/common';
import { OfferRepository } from '../../repositories/offer-repository';

@Injectable()
export class DeleteOfferUseCase {
  constructor(private offerRepository: OfferRepository) {}

  async execute(id: number, userId: number) {
    return await this.offerRepository.delete(id, userId);
  }
}
