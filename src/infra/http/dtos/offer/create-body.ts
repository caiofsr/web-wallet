import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateOfferBody {
  @IsNumber()
  @IsNotEmpty()
  quantity: number;

  @IsNumber()
  @IsNotEmpty()
  walletCoinId: number;
}
