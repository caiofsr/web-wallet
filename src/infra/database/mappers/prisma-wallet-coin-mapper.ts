import { WalletCoin as RawWalletCoin } from '@prisma/client';
import { WalletCoin } from '@application/entities/wallet-coin/wallet-coin';

export class PrismaWalletCoinMapper {
  static toPrisma(walletCoin: WalletCoin) {
    return {
      walletCoin: {
        id: walletCoin.id,
        balance: walletCoin.balance,
        coinId: walletCoin.coinId,
        walletId: walletCoin.walletId,
      },
    };
  }

  static toDomain(raw: RawWalletCoin) {
    return new WalletCoin(
      {
        balance: raw.balance,
        coinId: raw.coinId,
        walletId: raw.walletId,
      },
      raw.id,
    );
  }
}
