import { Controller, Delete, Get, Param, Post, Query } from '@nestjs/common';
import { DeleteOfferUseCase } from '@application/use-cases/offer/delete-offer';

@Controller('offers')
export class OffersController {
  constructor(private deleteOfferUseCase: DeleteOfferUseCase) {}

  @Get('')
  async getOffers() {
    return;
  }

  @Post('')
  async createOffer() {
    return;
  }

  @Delete(':id')
  async deleteOffer(@Param('id') id: string, @Query('userId') userId: string) {
    await this.deleteOfferUseCase.execute(Number(id), Number(userId));

    return;
  }
}
