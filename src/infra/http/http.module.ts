import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OffersController } from './controllers/offer.controller';
import { DeleteOfferUseCase } from '@application/use-cases/offer/delete-offer';
import { GetOffersUseCase } from '@application/use-cases/offer/get-offers';

@Module({
  imports: [DatabaseModule],
  controllers: [OffersController],
  providers: [DeleteOfferUseCase, GetOffersUseCase],
})
export class HttpModule {}
