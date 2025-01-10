import React from 'react';
import Offer from '@ts_types/offer';

const initialState: Offer.State = {
  offers: undefined,
};

export const OffersContext = React.createContext<Offer.Context | undefined>(
  undefined
);

const reducer = (state: Offer.State, action: Offer.Action): Offer.State => {
  switch (action.type) {
    case 'SET_OFFERS':
      return { ...state, offers: action.payload.offers };

    case 'ADD_OFFER':
      return {
        ...state,
        offers: state.offers
          ? [...state.offers, action.payload.offer]
          : [action.payload.offer],
      };

    case 'UPDATE_OFFER':
      const updatedOffers = state.offers?.map((offer) => {
        if (offer._id === action.payload.offer._id) {
          return { ...offer, ...action.payload.offer };
        }
        return offer;
      });

      return { ...state, offers: updatedOffers };

    case 'DELETE_OFFER':
      const deletedOffers = state.offers?.filter(
        (offer) => offer._id !== action.payload.offerId
      );

      return { ...state, offers: deletedOffers };

    case 'ACTIVATE_OFFER':
      const activatedOffers = state.offers?.map((offer) => {
        if (offer._id === action.payload.offerId) {
          return { ...offer, isActive: true };
        }
        return offer;
      });
      return { ...state, offers: activatedOffers };

    case 'SET_CURRENT_OFFER':
      return {
        ...state,
        offer: action.payload.offer,
      };

    case 'UNSET_CURRENT_OFFER':
      return {
        ...state,
        offer: undefined,
      };

    default:
      return state;
  }
};

type Props = React.PropsWithChildren;

const OffersProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = React.useMemo(() => {
    return {
      offer: state.offer,
      offers: state.offers,
      setOffers: dispatch,
    };
  }, [state.offer, state.offers, dispatch]);

  return (
    <OffersContext.Provider value={value}>{children}</OffersContext.Provider>
  );
};

export default OffersProvider;
