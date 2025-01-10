import { gql } from '@apollo/client';

export const GET_TOKEN_BALANCE = gql`
  query GetTokenBalance($walletId: ID!, $contractAddress: String) {
    getTokenBalance(walletId: $walletId, contractAddress: $contractAddress)
  }
`;

export const SEND_TOKEN = gql`
  mutation SendToken(
    $to: String!
    $walletId: ID!
    $amount: Float!
    $contractAddress: String
  ) {
    sendToken(
      to: $to
      amount: $amount
      walletId: $walletId
      contractAddress: $contractAddress
    )
  }
`;

export const GET_GAS_ESTIMATE = gql`
  query GetGasEstimate(
    $to: String!
    $value: String!
    $maxFeePerGas: String
    $maxPriorityFee: String!
  ) {
    getGasEstimate(
      to: $to
      value: $value
      maxFeePerGas: $maxFeePerGas
      maxPriorityFee: $maxPriorityFee
    )
  }
`;
