import { gql } from '@apollo/client/core/core.cjs';

export const CREATE_WALLET = gql`
  mutation CreateWallet($payload: CreateWalletPayload!) {
    createWallet(payload: $payload) {
      privateKey
      publicKey
      platform
    }
  }
`;

export const GET_USER_WALLETS = gql`
  query UserWallets {
    userWallets {
      _id
      privateKey
      publicKey
      platform
    }
  }
`;

export const GET_ASSET_BALANCE = gql`
  query GetAssetBalance($payload: GetAssetBalancePayload!) {
    getAssetBalance(payload: $payload)
  }
`;
