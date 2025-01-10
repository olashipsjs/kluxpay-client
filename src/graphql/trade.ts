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
        isOnline
        lastActive
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
        isOnline
        lastActive
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
      createdAt
      offer {
        _id
        notes
        fiat {
          id
          name
          sign
          symbol
        }
        type
        coin
        timeout
        minLimit
        maxLimit
        createdBy {
          _id
          email
          isOnline
          lastActive
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
        isOnline
        lastActive
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

export const COMPLETE_TRADE = gql`
  mutation CompleteTrade($tradeId: ID!) {
    completeTrade(tradeId: $tradeId) {
      _id
      rate
      amount
      status
      createdAt
      offer {
        _id
        notes
        fiat {
          id
          name
          sign
          symbol
        }
        type
        coin
        timeout
        minLimit
        maxLimit
        createdBy {
          _id
          email
          isOnline
          lastActive
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
        isOnline
        lastActive
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

export const CANCEL_TRADE = gql`
  mutation CancelTrade($tradeId: ID!) {
    cancelTrade(tradeId: $tradeId) {
      _id
      rate
      amount
      status
      createdAt
      offer {
        _id
        notes
        fiat {
          id
          name
          sign
          symbol
        }
        type
        coin
        timeout
        minLimit
        maxLimit
        createdBy {
          _id
          email
          isOnline
          lastActive
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
        isOnline
        lastActive
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
