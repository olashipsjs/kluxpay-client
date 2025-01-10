import User from './user';

namespace Wallet {
  export type Type = {
    _id: string;
    name?: string;
    escrow: number;
    balance: number;
    publicKey: 'string';
    network: {
      _id: string;
      name: string;
      image: string;
      symbol: string;
      ticker: string;
    };
    user: User.Type;
  };

  export type State = {
    token: any;
    wallet?: Wallet.Type;
    wallets: Wallet.Type[] | null | undefined;
  };

  export type Action =
    | {
        type: 'SET_WALLETS';
        payload: { wallets: State['wallets'] };
      }
    | {
        type: 'ADD_WALLET';
        payload: { wallets: Type[] };
      }
    | {
        type: 'UPDATE_WALLET';
        payload: { wallet: Type };
      }
    | {
        type: 'DELETE_WALLET';
        payload: { walletId: string };
      }
    | { type: 'SET_CURRENT_WALLET'; payload: { wallet: Type } }
    | {
        type: 'SET_TOKEN_';
      }
    | { type: 'SET_CURRENT_TOKEN'; payload: { token: any } };

  export type Context = {
    token: any;
    wallet?: Wallet.Type;
    wallets: State['wallets'];
    setWallets: React.Dispatch<Action>;
  };
}

export default Wallet;
