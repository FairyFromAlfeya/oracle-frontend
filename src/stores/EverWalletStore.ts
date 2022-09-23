import { Address, ProviderRpcClient } from 'everscale-inpage-provider';
import { makeAutoObservable } from 'mobx';
import { BigNumber } from 'bignumber.js';
import { RootStore } from './RootStore';

export class EverWalletStore {
  private readonly _client: ProviderRpcClient;

  private _account: Address | null = null;

  private _balance = new BigNumber(0);

  private _hasExtension = false;

  private _isInitialized = false;

  constructor(private readonly rootStore: RootStore) {
    makeAutoObservable(this);

    this._client = new ProviderRpcClient();

    this._initialize().catch((e) =>
      console.error('Fail to initialize EverWallet:', e),
    );
  }

  get isInitialized(): boolean {
    return this._isInitialized;
  }

  get address(): string | undefined {
    return this._account?.toString();
  }

  get balance(): string {
    return this._balance.shiftedBy(-9).toString();
  }

  get hasExtension(): boolean {
    return this._hasExtension;
  }

  connect = (): void => {
    this._client
      .requestPermissions({
        permissions: ['basic', 'accountInteraction'],
      })
      .then((response) =>
        this._setAccount(response.accountInteraction!.address),
      )
      .then(() => this._requestBalance());
  };

  disconnect = (): void => {
    this._client.disconnect().then(() => this._reset());
  };

  private _initialize = (): Promise<void> =>
    this._checkExtension()
      .then(() => this._checkConnection())
      .then(() => this._setIsInitialized(true));

  private _checkExtension = (): Promise<void> =>
    this._client.hasProvider().then((result) => this._setHasExtension(result));

  private _checkConnection = (): void => {
    if (this._hasExtension) {
      this._client
        .getProviderState()
        .then((state) =>
          this._setAccount(
            state.permissions.accountInteraction
              ? state.permissions.accountInteraction.address
              : null,
          ),
        )
        .then(() => this._requestBalance());
    }
  };

  private _requestBalance = (): void => {
    if (this._account) {
      this._client
        .getBalance(this._account)
        .then((balance) => this._setBalance(balance));
    }
  };

  private _setHasExtension = (hasExtension: boolean): void => {
    this._hasExtension = hasExtension;
  };

  private _setBalance = (balance: string): void => {
    this._balance = new BigNumber(balance);
  };

  private _setAccount = (account: Address | null): void => {
    this._account = account;
  };

  private _setIsInitialized = (isInitialized: boolean): void => {
    this._isInitialized = isInitialized;
  };

  private _reset = (): void => {
    this._setBalance('0');
    this._setAccount(null);
  };
}
