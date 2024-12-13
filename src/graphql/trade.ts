import { gql } from '@apollo/client/core/core.cjs';

export const CREATE_TRADE = gql`
  mutation CreateTrade($payload: CreateTradePayload!) {
    createTrade(payload: $payload) {
      _id
      rate
      amount
      offer {
        minLimit
        maxLimit
        createdBy {
          _id
          firstName
          lastName
        }
        payment {
          _id
          method
          details
          bankAccountName
          bankAccountNumber
        }
      }
      createdBy {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const GET_USER_TRADES = gql`
  query GetUserTrades {
    getUserTrades {
      _id
      rate
      amount
      offer {
        _id
        fiat
        type
        coinId
        minLimit
        maxLimit
        createdBy {
          _id
          firstName
          lastName
        }
        payment {
          _id
          method
          details
          bankAccountName
          bankAccountNumber
        }
      }
      createdBy {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const GET_TRADE = gql`
  query GetTrade($id: ID!) {
    getTrade(id: $id) {
      _id
      rate
      amount
      offer {
        _id
        fiat
        type
        coinId
        minLimit
        maxLimit
        createdBy {
          _id
          firstName
          lastName
        }
        payment {
          _id
          method
          details
          bankAccountName
          bankAccountNumber
        }
      }
      createdBy {
        _id
        firstName
        lastName
      }
    }
  }
`;
