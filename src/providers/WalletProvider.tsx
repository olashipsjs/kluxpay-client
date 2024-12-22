import { GET_USER_WALLETS } from '@graphql/wallet';
import useApolloQuery from '@hooks/useApolloQuery';
import Wallet from '@ts_types/wallet';
import React from 'react';

const initialState: Wallet.State = {
  wallets: undefined,
};

export const WalletContext = React.createContext<Wallet.Context | undefined>(
  undefined
);

const reducer = (state: Wallet.State, action: Wallet.Action): Wallet.State => {
  switch (action.type) {
    case 'SET_WALLETS':
      return { ...state, wallets: action.payload.wallets };

    case 'ADD_WALLET':
      return {
        ...state,
        wallets: state.wallets
          ? [...state.wallets, action.payload.wallet]
          : [action.payload.wallet],
      };

    case 'UPDATE_WALLET':
      const updatedWallets = state.wallets
        ? state.wallets.map((wallet) => {
            if (action.payload.wallet._id === wallet._id) {
              return { ...wallet, ...action.payload.wallet };
            }
            return wallet;
          })
        : state.wallets;
      return { ...state, wallets: updatedWallets };

    case 'DELETE_WALLET':
      const filteredWallets = state.wallets
        ? state.wallets.filter(
            (wallet) => wallet._id !== action.payload.walletId
          )
        : state.wallets;

      return { ...state, wallets: filteredWallets };

    default:
      return state;
  }
};

const WalletProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useApolloQuery(GET_USER_WALLETS, {
    onCompleted: (data: any) => {
      if (data?.getUserWallets) {
        dispatch({
          type: 'SET_WALLETS',
          payload: { wallets: data.getUserWallets },
        });
      }
    },
    onError: () => {
      dispatch({ type: 'SET_WALLETS', payload: { wallets: null } });
    },
  });

  const value = React.useMemo(() => {
    return { wallets: state.wallets, setWallets: dispatch };
  }, [state.wallets, dispatch]);

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export default WalletProvider;
