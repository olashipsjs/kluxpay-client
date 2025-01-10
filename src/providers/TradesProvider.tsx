import React from 'react';
import Trades from '@ts_types/trades';

const initialState: Trades.State = {
  trades: undefined,
  trade: undefined,
};

export const TradeContext = React.createContext<Trades.Context | undefined>(
  undefined
);

const reducer = (state: Trades.State, action: Trades.Action): Trades.State => {
  switch (action.type) {
    case 'SET_TRADES':
      return { ...state, trades: action.payload.trades };

    case 'ADD_TRADE':
      return {
        ...state,
        trades: state.trades
          ? [...state.trades, action.payload.trade]
          : [action.payload.trade],
      };

    case 'UPDATE_TRADE':
      const updatedOffers = state.trades?.map((trade) => {
        if (trade._id === action.payload.trade._id) {
          return { ...trade, ...action.payload.trade };
        }
        return trade;
      });

      return { ...state, trades: updatedOffers };

    case 'SET_CURRENT_TRADE':
      return {
        ...state,
        trade: action.payload.trade,
      };

    default:
      return state;
  }
};

type Props = React.PropsWithChildren;

const TradesProvider = ({ children }: Props) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  const value = React.useMemo(() => {
    return {
      trade: state.trade,
      trades: state.trades,
      setTrades: dispatch,
    };
  }, [state.trade, state.trades, dispatch]);

  return (
    <TradeContext.Provider value={value}>{children}</TradeContext.Provider>
  );
};

export default TradesProvider;
