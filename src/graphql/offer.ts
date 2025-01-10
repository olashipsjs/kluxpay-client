import { gql } from '@apollo/client';

export const CREATE_OFFER = gql`
  mutation CreateOffer(
    $type: String!
    $fiat: String!
    $coinId: ID!
    $timeout: Int!
    $minLimit: Float!
    $maxLimit: Float!
    $paymentId: ID
    $margin: Float!
    $notes: String!
  ) {
    createOffer(
      type: $type
      fiat: $fiat
      coinId: $coinId
      timeout: $timeout
      minLimit: $minLimit
      maxLimit: $maxLimit
      paymentId: $paymentId
      margin: $margin
      notes: $notes
    ) {
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
      timeout
      minLimit
      maxLimit
      payment {
        _id
        method
        bankName
        bankAccountName
        bankAccountNumber
      }
      margin
      createdAt
      createdBy {
        _id
        firstName
        lastName
        username
        avatar {
          url
        }
      }
    }
  }
`;

export const UPDATE_OFFER = gql`
  mutation UpdateOffer(
    $offerId: ID!
    $fiatId: ID
    $coinId: ID
    $notes: String
    $timeout: Int
    $minLimit: Float
    $maxLimit: Float
    $paymentId: ID
    $margin: Float
  ) {
    updateOffer(
      offerId: $offerId
      fiatId: $fiatId
      coinId: $coinId
      notes: $notes
      timeout: $timeout
      minLimit: $minLimit
      maxLimit: $maxLimit
      paymentId: $paymentId
      margin: $margin
    ) {
      _id
      type
      fiat {
        id
        name
        sign
        symbol
      }
      type
      coin
      notes
      timeout
      minLimit
      maxLimit
      isActive
      payment {
        _id
        method
        bankName
        bankAccountNumber
        bankAccountName
      }
      margin
      createdAt
      createdBy {
        _id
        firstName
        lastName
        username
        avatar {
          url
        }
      }
    }
  }
`;

export const GET_USER_OFFERS = gql`
  query GetUserOffers {
    getUserOffers {
      _id
      type
      fiat {
        id
        name
        sign
        symbol
      }
      coin
      notes
      timeout
      minLimit
      maxLimit
      isActive
      payment {
        method
        bankName
        bankAccountName
        bankAccountNumber
        details
      }
      createdBy {
        _id
        firstName
        lastName
        username
        avatar {
          url
        }
      }
      margin
      createdAt
    }
  }
`;

export const GET_OFFER_BY_ID = gql`
  query GetOfferById($offerId: ID!) {
    getOfferById(offerId: $offerId) {
      _id
      type
      fiat {
        id
        name
        sign
        symbol
      }
      coin
      createdAt
      timeout
      minLimit
      maxLimit
      isActive
      notes
      margin
      payment {
        _id
        method
        bankName
        bankAccountName
        bankAccountNumber
        details
      }
      createdBy {
        _id
        lastName
        firstName
        username
        avatar {
          url
        }
      }
    }
  }
`;

export const GET_ALL_OFFERS = gql`
  query GetAllOffers($type: String, $limit: Int, $page: Int, $fiat: String) {
    getAllOffers(type: $type, limit: $limit, page: $page, fiat: $fiat) {
      page
      limit
      total
      offers {
        _id
        type
        fiat {
          id
          name
          sign
          symbol
        }
        coin
        createdAt
        timeout
        minLimit
        maxLimit
        isActive
        notes
        margin
        payment {
          _id
          method
          bankName
          bankAccountName
          bankAccountNumber
          details
        }
        createdBy {
          _id
          username
          firstName
          lastName
          avatar {
            url
          }
        }
      }
    }
  }
`;

export const DELETE_OFFER = gql`
  mutation DeleteOffer($offerId: ID!) {
    deleteOffer(offerId: $offerId)
  }
`;

export const ACTIVATE_OFFER = gql`
  mutation ActivateOffer($offerId: ID!, $rate: Float!) {
    activateOffer(offerId: $offerId, rate: $rate)
  }
`;
