import { gql } from '@apollo/client';

export const GET_ALL_P2P_COINS = gql`
  query GetAllP2PCoins($convert: String!) {
    getAllP2PCoins(convert: $convert)
  }
`;

export const GET_COIN_QUOTE = gql`
  query GetCoinQuote($coinId: Int!, $convert: String!) {
    getCoinQuote(coinId: $coinId, convert: $convert)
  }
`;

export const GET_COIN_BY_NAME = gql`
  query GetCoinByName($coinName: String!, $convert: String!) {
    getCoinByName(coinName: $coinName, convert: $convert)
  }
`;

export const GET_ALL_COINS = gql`
  query GetAllCoins($page: Int, $convert: String) {
    getAllCoins(page: $page, convert: $convert)
  }
`;
