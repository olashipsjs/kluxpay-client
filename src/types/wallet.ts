import User from './user';

namespace Wallet {
  export type Type = {
    _id: string;
    escrow: number;
    balance: number;
    publicKey: 'string';
    platform: 'ethereum' | 'solana' | 'bitcoin';
    user: User.Type;
  };

  export type State = {
    wallets: Wallet.Type[] | null | undefined;
  };

  export type Action =
    | {
        type: 'SET_WALLETS';
        payload: { wallets: State['wallets'] };
      }
    | {
        type: 'ADD_WALLET';
        payload: { wallet: Type };
      }
    | {
        type: 'UPDATE_WALLET';
        payload: { wallet: Type };
      }
    | {
        type: 'DELETE_WALLET';
        payload: { walletId: string };
      };

  export type Context = {
    wallets: State['wallets'];
    setWallets: React.Dispatch<Action>;
  };
}

export default Wallet;
