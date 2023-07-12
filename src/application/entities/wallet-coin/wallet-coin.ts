interface WalletCoinProps {
  balance: number;
  walletId: number;
  coinId: number;
}

export class WalletCoin {
  constructor(private props: WalletCoinProps, public id: number) {}

  public get balance(): number {
    return this.props.balance;
  }

  public set balance(value: number) {
    this.props.balance = value;
  }

  public get walletId(): number {
    return this.props.walletId;
  }

  public set walletId(value: number) {
    this.props.walletId = value;
  }

  public get coinId(): number {
    return this.props.coinId;
  }

  public set coinId(value: number) {
    this.props.coinId = value;
  }
}
