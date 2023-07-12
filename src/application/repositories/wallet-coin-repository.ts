import { WalletCoin } from '@application/entities/wallet-coin/wallet-coin';

export abstract class WalletCoinRepository {
  abstract findById(id: number, userId: number): Promise<WalletCoin>;
  abstract create(walletCoin: WalletCoin): Promise<WalletCoin>;
}
