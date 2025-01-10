import Offer from './offer';
import User from './user';
import Wallet from './wallet';

namespace Trades {
  export type Type = {
    _id: string;
    rate: number;
    amount: number;
    createdAt: Date;
    status: string;
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
        type: 'SET_CURRENT_TRADE';
        payload: { trade: Type };
      }
    | {
        type: 'SET_TRADE_STATUS';
        payload: { tradeId: string; status: string };
      };

  export type Context = {
    trade?: Type;
    trades: State['trades'];
    setTrades: React.Dispatch<Action>;
  };
}

export default Trades;
