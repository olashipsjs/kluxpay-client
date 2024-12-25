import User from './user';

namespace Wallet {
  export type Type = {
    _id: string;
    name?: string;
    escrow: number;
    balance: number;
    publicKey: 'string';
    network: string;
    user: User.Type;
  };

  export type State = {
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
    | { type: 'SET_CURRENT_WALLET'; payload: { walletId: string } };

  export type Context = {
    wallet?: Wallet.Type;
    wallets: State['wallets'];
    setWallets: React.Dispatch<Action>;
  };
}

export default Wallet;
