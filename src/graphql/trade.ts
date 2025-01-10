import { gql } from '@apollo/client';

export const CREATE_TRADE = gql`
  mutation CreateTrade($offerId: ID!, $rate: Float!, $amount: Float!) {
    createTrade(offerId: $offerId, rate: $rate, amount: $amount) {
      _id
      rate
      amount
      offer {
        type
        coin
        minLimit
        maxLimit
        fiat {
          id
          name
          symbol
          sign
        }
        createdBy {
          _id
          firstName
          lastName
          username
          avatar {
            url
          }
          email
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
        username
        email
        avatar {
          url
        }
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
      status
      createdAt
      updatedAt
      offer {
        _id
        fiat {
          id
          name
          sign
          symbol
        }
        type
        coin
        notes
        minLimit
        maxLimit
        createdBy {
          _id
          firstName
          lastName
          email
          username
          avatar {
            url
          }
        }
        payment {
          _id
          method
          details
          bankName
          bankAccountName
          bankAccountNumber
        }
      }
      createdBy {
        _id
        email
        avatar {
          url
        }
        username
        firstName
        lastName
      }
    }
  }
`;

export const GET_TRADE_BY_ID = gql`
  query GetTradeById($tradeId: ID!) {
    getTradeById(tradeId: $tradeId) {
      _id
      rate
      amount
      status
      offer {
        _id
        fiat {
          id
          name
          sign
          symbol
        }
        type
        coin
        minLimit
        maxLimit
        createdBy {
          _id
          email
          avatar {
            url
          }
          username
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
        email
        avatar {
          url
        }
        username
        firstName
        lastName
      }
    }
  }
`;
