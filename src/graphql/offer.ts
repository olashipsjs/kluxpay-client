import { gql } from '@apollo/client/core/core.cjs';

export const CREATE_OFFER = gql`
  mutation CreateOffer($payload: CreateOfferPayload!) {
    createOffer(payload: $payload) {
      _id
      fiat
      type
      coinId
      amount
      timeout
      minLimit
      maxLimit
      payment {
        method
        bankAccountName
      }
      priceMargin
    }
  }
`;

export const UPDATE_OFFER = gql`
  mutation UpdateOffer($id: ID!, $payload: UpdateOfferPayload!) {
    updateOffer(id: $id, payload: $payload) {
      _id
      type
      fiat
      coinId
      amount
      timeout
      minLimit
      maxLimit
      isActive
      payment {
        method
        bankAccountName
      }
      priceMargin
    }
  }
`;

export const GET_USER_OFFERS = gql`
  query GetUserOffers {
    getUserOffers {
      _id
      type
      fiat
      coinId
      amount
      timeout
      minLimit
      maxLimit
      isActive
      payment {
        method
        bankAccountName
        bankAccountNumber
        details
      }
      priceMargin
    }
  }
`;

export const GET_OFFER = gql`
  query GetOffer($id: ID!) {
    getOffer(id: $id) {
      _id
      type
      fiat
      coinId
      amount
      timeout
      minLimit
      maxLimit
      isActive
      notes
      priceMargin
      payment {
        _id
        method
        bankName
        bankAccountName
        bankAccountNumber
        details
      }
      createdBy {
        lastName
        firstName
      }
    }
  }
`;

export const GET_OFFERS = gql`
  query GetOffers($payload: GetOffersPayload) {
    getOffers(payload: $payload) {
      page
      limit
      total
      offers {
        _id
        type
        fiat
        coinId
        amount
        timeout
        minLimit
        maxLimit
        isActive
        notes
        priceMargin
        payment {
          _id
          method
          bankAccountName
          bankAccountNumber
          details
        }
        createdBy {
          _id
          firstName
          lastName
        }
      }
    }
  }
`;

export const DELETE_OFFER = gql`
  mutation DeleteOffer($id: ID!) {
    deleteOffer(id: $id) {
      _id
      type
      fiat
      coinId
      amount
      timeout
      minLimit
      maxLimit
      isActive
      notes
      priceMargin
      payment {
        _id
        method
        bankAccountName
        bankAccountNumber
        details
      }
      createdBy {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const ACTIVATE_OFFER = gql`
  mutation ActivateOffer($id: ID!) {
    activateOffer(id: $id) {
      _id
      type
      fiat
      coinId
      amount
      timeout
      minLimit
      maxLimit
      isActive
      notes
      priceMargin
      payment {
        _id
        method
        bankAccountName
        bankAccountNumber
        details
      }
      createdBy {
        _id
        firstName
        lastName
      }
    }
  }
`;
