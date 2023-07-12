import { WalletCoin } from '@application/entities/wallet-coin/wallet-coin';
import { WalletCoinRepository } from '@application/repositories/wallet-coin-repository';

export class InMemoryWalletCoinRepository implements WalletCoinRepository {
  public walletCoins: WalletCoin[] = [];

  async create(walletCoin: WalletCoin): Promise<WalletCoin> {
    this.walletCoins.push(walletCoin);

    return walletCoin;
  }

  async findById(id: number): Promise<WalletCoin | null> {
    const walletCoin = this.walletCoins.find((wallet) => wallet.id === id);

    if (!walletCoin) {
      return;
    }

    return walletCoin;
  }
}
