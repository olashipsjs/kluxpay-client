import { GET_USER_PAYMENTS } from '@graphql/payment';
import useApolloQuery from '@hooks/useApolloQuery';
import Payment from '@ts_types/types';
import React from 'react';

const initialState: Payment.State = { payments: [] };

export const PaymentsContext = React.createContext<Payment.Context | undefined>(
  undefined
);

const reducer = (state: Payment.State, action: Payment.Action) => {
  switch (action.type) {
    case 'SET_PAYMENTS':
      return {
        ...state,
        payments: action.payload.payments,
      };

    case 'ADD_PAYMENT':
      return {
        ...state,
        payments: [...state.payments, action.payload.payment],
      };

    case 'UPDATE_PAYMENT':
      const updatedPayments = state.payments.map((payment) => {
        if (payment._id === action.payload.payment._id) {
          return { ...payment, ...action.payload.payment };
        }
        return payment;
      });

      return { ...state, payments: updatedPayments };

    case 'DELETE_PAYMENT':
      const deletedPayments = state.payments.filter(
        (offer) => offer._id !== action.payload.paymentId
      );

      return { ...state, payments: deletedPayments };

    default:
      return state;
  }
};

type Props = React.PropsWithChildren;

const PaymentsProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  useApolloQuery<any>(GET_USER_PAYMENTS, {
    onCompleted: (data) => {
      dispatch({
        type: 'SET_PAYMENTS',
        payload: { payments: data?.getUserPayments },
      });
    },
  });

  const value = React.useMemo<Payment.Context>(() => {
    return { payments: state.payments, setPayments: dispatch };
  }, [state.payments, dispatch]);

  return (
    <PaymentsContext.Provider value={value}>
      {children}
    </PaymentsContext.Provider>
  );
};

export default PaymentsProvider;
