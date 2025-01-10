import User from './user';

namespace Referral {
  export type Type = {
    _id: string;
    referrer: User.Type;
    referee: User.Type;
    status: 'redeemed' | 'pending';
    createdAt: Date;
  };

  export type State = {
    referrals: Type[] | null | undefined;
  };

  export type Action =
    | {
        type: 'SET_REFERRALS';
        payload: { referrals: State['referrals'] };
      }
    | {
        type: 'ADD_REFERRAL';
        payload: { referral: Type };
      }
    | {
        type: 'REDEEM_REFERRAL';
        payload: { referralId: string };
      };

  export type Context = {
    referrals: State['referrals'];
    setReferrals: React.Dispatch<Action>;
  };
}

export default Referral;
