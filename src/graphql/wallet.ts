import { gql } from '@apollo/client';

export const CREATE_WALLETS = gql`
  mutation CreateWallets($email: String!, $networks: String!) {
    createWallets(email: $email, networks: $networks) {
      _id
      name
      privateKey
      publicKey
      network {
        _id
        name
        image
        symbol
        ticker
      }
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
      network {
        _id
        name
        image
        symbol
        ticker
      }
    }
  }
`;

export const GET_USER_BALANCE = gql`
  query GetUserBalance {
    getUserBalance
  }
`;

export const GET_USER_WALLETS = gql`
  query GetUserWallets {
    getUserWallets {
      _id
      name
      privateKey
      publicKey
      network {
        _id
        name
        image
        symbol
        ticker
      }
    }
  }
`;

export const GET_WALLET = gql`
  query GetWallet($id: ID!) {
    getWallet(id: $id) {
      _id
      name
      privateKey
      publicKey
      network {
        _id
        name
        image
        symbol
        ticker
      }
    }
  }
`;
