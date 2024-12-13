import User from './user';

namespace Payment {
  export type Type = {
    _id: string;
    method: string;
    details: string;
    bankAccountName: string;
    bankAccountNumber: string;
    createdBy: User.Type;
  };

  export type State = { payments: Type[] };

  export type Action =
    | { type: 'SET_PAYMENTS'; payload: { payments: Type[] } }
    | {
        type: 'ADD_PAYMENT';
        payload: { payment: Type };
      }
    | {
        type: 'UPDATE_PAYMENT';
        payload: { payment: Type };
      }
    | {
        type: 'DELETE_PAYMENT';
        payload: { paymentId: string };
      };

  export type Context = {
    payments: State['payments'];
    setPayments: React.Dispatch<Action>;
  };
}

export default Payment;
