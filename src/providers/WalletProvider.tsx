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
          ? [...state.wallets, ...action.payload.wallets]
          : action.payload.wallets,
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

    case 'SET_CURRENT_WALLET':
      const wallet = state.wallets?.find(
        (w) => w._id === action.payload.walletId
      );
      return { ...state, wallet };

    default:
      return state;
  }
};

const WalletProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);
  useApolloQuery(GET_USER_WALLETS, {
    pollInterval: 60000,
    onCompleted: (data: any) => {
      if (data?.getUserWallets) {
        dispatch({
          type: 'SET_WALLETS',
          payload: { wallets: data.getUserWallets },
        });

        dispatch({
          type: 'SET_CURRENT_WALLET',
          payload: { walletId: data.getUserWallets[0]._id },
        });
      }
    },
    onError: () => {
      dispatch({ type: 'SET_WALLETS', payload: { wallets: null } });
    },
  });

  const value = React.useMemo(() => {
    return {
      wallets: state.wallets,
      wallet: state.wallet,
      setWallets: dispatch,
    };
  }, [state.wallets, dispatch]);

  return (
    <WalletContext.Provider value={value}>{children}</WalletContext.Provider>
  );
};

export default WalletProvider;
