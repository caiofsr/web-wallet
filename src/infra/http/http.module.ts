import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OffersController } from './controllers/offer.controller';
import { DeleteOfferUseCase } from '@application/use-cases/offer/delete-offer';
import { GetOffersUseCase } from '@application/use-cases/offer/get-offers';
import { CreateOffersUseCase } from '@application/use-cases/offer/create-offer';

@Module({
  imports: [DatabaseModule],
  controllers: [OffersController],
  providers: [DeleteOfferUseCase, GetOffersUseCase, CreateOffersUseCase],
})
export class HttpModule {}
