import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { DeleteOfferUseCase } from '@application/use-cases/offer/delete-offer';
import { GetOffersUseCase } from '@application/use-cases/offer/get-offers';
import { OfferViewModel } from '@infra/database/prisma/view-models/offer-view-model';
import { CreateOffersUseCase } from '@application/use-cases/offer/create-offer';
import { CreateOfferBody } from '../dtos/offer/create-body';

@Controller('offers')
export class OffersController {
  constructor(
    private deleteOfferUseCase: DeleteOfferUseCase,
    private getOffersUseCase: GetOffersUseCase,
    private createOfferUseCase: CreateOffersUseCase,
  ) {}

  @Get('')
  async getOffers(@Query('page') page: string, @Query('limit') limit: string) {
    return {
      data: OfferViewModel.toHttpArray(
        await this.getOffersUseCase.execute(Number(page), Number(limit)),
      ),
    };
  }

  @Post('')
  async createOffer(
    @Body() { quantity, walletCoinId }: CreateOfferBody,
    @Query('userId') userId: string,
  ) {
    return {
      data: OfferViewModel.toHttp(
        await this.createOfferUseCase.execute(
          { quantity, walletCoinId },
          Number(userId),
        ),
      ),
    };
  }

  @Delete(':id')
  async deleteOffer(@Param('id') id: string, @Query('userId') userId: string) {
    await this.deleteOfferUseCase.execute(Number(id), Number(userId));

    return;
  }
}
