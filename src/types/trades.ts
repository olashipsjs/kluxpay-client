import Offer from './offer';
import User from './user';
import Wallet from './wallet';

namespace Trades {
  export type Type = {
    _id: string;
    rate: number;
    amount: number;
    createAt: Date;
    wallet?: Wallet.Type;
    offer: Offer.Type;
    createdBy: User.Type;
  };

  export type State = { trade?: Type; trades: null | undefined | Type[] };

  export type Action =
    | { type: 'SET_TRADES'; payload: { trades: State['trades'] } }
    | {
        type: 'ADD_TRADE';
        payload: { trade: Type };
      }
    | {
        type: 'UPDATE_TRADE';
        payload: { trade: Type };
      }
    | {
        type: 'SET_CURRENT_TRADE';
        payload: { trade: Type };
      };

  export type Context = {
    trade?: Type;
    trades: State['trades'];
    setTrades: React.Dispatch<Action>;
  };
}

export default Trades;
