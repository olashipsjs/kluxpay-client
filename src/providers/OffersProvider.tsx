import React from 'react';
import Offer from '@ts_types/offer';

const initialState: Offer.State = {
  offers: [],
};

export const OffersContext = React.createContext<Offer.Context | undefined>(
  undefined
);

const reducer = (state: Offer.State, action: Offer.Action): Offer.State => {
  switch (action.type) {
    case 'SET_OFFERS':
      return { ...state, offers: [...state.offers, ...action.payload.offers] };

    case 'ADD_OFFER':
      return { ...state, offers: [...state.offers, action.payload.offer] };

    case 'UPDATE_OFFER':
      const updatedOffers = state.offers.map((offer) => {
        if (offer._id === action.payload.offer._id) {
          return { ...offer, ...action.payload.offer };
        }
        return offer;
      });

      return { ...state, offers: [...state.offers, ...updatedOffers] };

    case 'DELETE_OFFER':
      const deletedOffers = state.offers.filter(
        (offer) => offer._id !== action.payload.offerId
      );

      return { ...state, offers: [...state.offers, ...deletedOffers] };

    default:
      return state;
  }
};

type Props = React.PropsWithChildren;

const OffersProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <OffersContext.Provider
      value={{ setOffers: dispatch, offers: state.offers }}
    >
      {children}
    </OffersContext.Provider>
  );
};

export default OffersProvider;
