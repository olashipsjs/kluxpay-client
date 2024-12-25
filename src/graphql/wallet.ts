import { gql } from '@apollo/client/core/core.cjs';

export const CREATE_WALLET = gql`
  mutation CreateWallet($payload: CreateWalletPayload!) {
    createWallet(payload: $payload) {
      _id
      name
      privateKey
      publicKey
      network
      escrow
      balance
    }
  }
`;

export const UPDATE_WALLET = gql`
  mutation UpdateWallet($id: ID!, $payload: UpdateWalletPayload!) {
    updateWallet(id: $id, payload: $payload) {
      _id
      name
      privateKey
      publicKey
      network
      escrow
      balance
    }
  }
`;

export const GET_USER_WALLETS = gql`
  query GetUserWallets {
    getUserWallets {
      _id
      name
      privateKey
      publicKey
      network
      balance
    }
  }
`;

export const GET_WALLET = gql`
  query GetWallet($id: ID!) {
    getWallet(id: $id) {
      _id
      name
      ss
      privateKey
      publicKey
      network
      balance
    }
  }
`;

export const GET_BALANCE = gql`
  query GetBalance {
    getBalance
  }
`;

export const GET_ASSET_BALANCE = gql`
  query GetAssetBalance($payload: GetAssetBalancePayload!) {
    getAssetBalance(payload: $payload)
  }
`;
