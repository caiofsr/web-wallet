import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { OffersController } from './controllers/offer.controller';
import { DeleteOfferUseCase } from '@application/use-cases/offer/delete-offer';

@Module({
  imports: [DatabaseModule],
  controllers: [OffersController],
  providers: [DeleteOfferUseCase],
})
export class HttpModule {}
