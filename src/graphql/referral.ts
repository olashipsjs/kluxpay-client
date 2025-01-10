import { gql } from '@apollo/client';

export const GET_USER_REFERRALS = gql`
  query GetUserReferrals {
    getUserReferrals {
      _id
      referee {
        _id
        firstName
        lastName
        email
        username
      }
      referrer {
        _id
        firstName
        lastName
        email
        username
      }
      status
      createdAt
    }
  }
`;

export const CREATE_REFERRAL = gql`
  mutation CreateReferral($referralCode: String!) {
    createReferral(referralCode: $referralCode) {
      _id
      referee {
        _id
        firstName
        lastName
        email
        username
      }
      referrer {
        _id
        firstName
        lastName
        email
        username
      }
      status
      createdAt
    }
  }
`;

export const REDEEM_REFERRAL = gql`
  mutation RedeemReferral($referralId: ID!) {
    redeemReferral(referralId: $referralId) {
      _id
      referee {
        _id
        firstName
        lastName
        email
        username
      }
      referrer {
        _id
        firstName
        lastName
        email
        username
      }
      status
      createdAt
    }
  }
`;
