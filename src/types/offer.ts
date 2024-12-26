import User from './user';

namespace Offer {
  export type Type = {
    amount: number;
    minLimit: number;
    maxLimit: number;
    priceMargin: number;
    fiat: string;
    payment: any;
    coinId: string;
    _id: string;
    notes: string;
    type: 'buy' | 'sell';
    isActive: boolean;
    createdBy?: User.Type;
  };

  export type State = { offer?: Type; offers: null | undefined | Type[] };

  export type Action =
    | { type: 'SET_OFFERS'; payload: { offers: State['offers'] } }
    | {
        type: 'ADD_OFFER';
        payload: { offer: Type };
      }
    | {
        type: 'UPDATE_OFFER';
        payload: { offer: Type };
      }
    | {
        type: 'DELETE_OFFER';
        payload: { offerId: string };
      }
    | {
        type: 'ACTIVATE_OFFER';
        payload: { offerId: string };
      }
    | {
        type: 'SET_CURRENT_OFFER';
        payload: { offer: Type };
      };

  export type Context = {
    offer?: Type;
    offers: State['offers'];
    setOffers: React.Dispatch<Action>;
  };
}

export default Offer;
