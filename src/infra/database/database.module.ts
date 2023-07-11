import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { OfferRepository } from '@application/repositories/offer-repository';
import { PrismaOfferRepository } from './prisma/repositories/offer-repository';

@Module({
  providers: [
    PrismaService,
    { provide: OfferRepository, useClass: PrismaOfferRepository },
  ],
  exports: [OfferRepository],
})
export class DatabaseModule {}
