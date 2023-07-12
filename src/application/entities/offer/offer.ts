import { Replace } from '@helpers/replace';

export interface OfferProps {
  quantity: number;
  walletCoinId: number;
  coinName: string;
  coinToken: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;
}

interface Optional {
  coinToken?: string;
  coinName?: string;
  createdAt?: Date;
  updatedAt?: Date;
  deletedAt?: Date;
}

export class Offer {
  constructor(
    private props: Replace<OfferProps, Optional>,
    private _id?: number,
  ) {
    this.props = {
      ...props,
      createdAt: props.createdAt ?? new Date(),
      updatedAt: props.updatedAt ?? new Date(),
      deletedAt: props.deletedAt ?? null,
    };
  }

  public get id(): number {
    return this._id;
  }

  public get quantity(): number {
    return this.props.quantity;
  }

  public set quantity(quantity: number) {
    this.props.quantity = quantity;
  }

  public get walletCoinId(): number {
    return this.props.walletCoinId;
  }

  public set walletCoinId(walletCoinId: number) {
    this.props.walletCoinId = walletCoinId;
  }

  public get coinName(): string {
    return this.props.coinName;
  }

  public set coinName(coinName: string) {
    this.props.coinName = coinName;
  }

  public get coinToken(): string {
    return this.props.coinToken;
  }

  public set coinToken(coinToken: string) {
    this.props.coinToken = coinToken;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public get deletedAt(): Date {
    return this.props.deletedAt;
  }

  public delete() {
    this.props.deletedAt = new Date();
  }
}
