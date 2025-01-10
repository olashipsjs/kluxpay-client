import React from 'react';
import Referral from '@ts_types/referral';

const initialState: Referral.State = { referrals: undefined };

export const ReferralsContext = React.createContext<
  Referral.Context | undefined
>(undefined);

const reducer = (
  state: Referral.State,
  action: Referral.Action
): Referral.State => {
  switch (action.type) {
    case 'SET_REFERRALS':
      return {
        ...state,
        referrals: action.payload.referrals,
      };

    case 'ADD_REFERRAL':
      return {
        ...state,
        referrals: state.referrals
          ? [...state.referrals, action.payload.referral]
          : [action.payload.referral],
      };

    case 'REDEEM_REFERRAL':
      const updatedReferrals = state.referrals?.map((referral) => {
        if (referral._id === action.payload.referralId) {
          return { ...referral, status: 'redeemed' };
        }
        return referral;
      }) as Referral.State['referrals'];

      return {
        ...state,
        referrals: updatedReferrals,
      };
  }
};

type Props = React.PropsWithChildren;

const ReferralsProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = React.useMemo(() => {
    return { referrals: state.referrals, setReferrals: dispatch };
  }, [state.referrals, dispatch]);

  return (
    <ReferralsContext.Provider value={value}>
      {children}
    </ReferralsContext.Provider>
  );
};

export default ReferralsProvider;
