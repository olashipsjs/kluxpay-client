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
    type: 'buy' | 'sell';
    isActive: boolean;
  };

  export type State = { offers: null | undefined | Type[] };

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
      };

  export type Context = {
    offers: State['offers'];
    setOffers: React.Dispatch<Action>;
  };
}

export default Offer;
