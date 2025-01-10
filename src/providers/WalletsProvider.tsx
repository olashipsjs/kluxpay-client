import React from 'react';
import Wallet from '@ts_types/wallet';
import Query from '@components/query/Query';
import { GET_USER_WALLETS } from '@graphql/wallet';

const initialState: Wallet.State = {
  wallets: undefined,
  wallet: undefined,
  token: undefined,
};

export const WalletsContext = React.createContext<Wallet.Context | undefined>(
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
      return { ...state, wallet: action.payload.wallet };

    case 'SET_CURRENT_TOKEN':
      return { ...state, token: action.payload.token };

    default:
      return state;
  }
};

const WalletsProvider = ({ children }: React.PropsWithChildren) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = React.useMemo(() => {
    return {
      token: state.token,
      wallets: state.wallets,
      wallet: state.wallet,
      setWallets: dispatch,
    };
  }, [state.wallets, state.wallet, state.token, dispatch]);

  return (
    <WalletsContext.Provider value={value}>
      <Query
        query={GET_USER_WALLETS}
        onCompleted={(data) => {
          if (data && data.getUserWallets) {
            value.setWallets({
              type: 'SET_WALLETS',
              payload: { wallets: data.getUserWallets },
            });

            value.setWallets({
              type: 'SET_CURRENT_WALLET',
              payload: { wallet: data.getUserWallets[0] },
            });
          }
        }}
      >
        <Query.Loader />
        <Query.Error></Query.Error>
        <Query.Data>{children}</Query.Data>
      </Query>
    </WalletsContext.Provider>
  );
};

export default WalletsProvider;
