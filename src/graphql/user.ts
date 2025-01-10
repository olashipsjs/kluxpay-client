import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation CreateUser(
    $email: String!
    $lastName: String!
    $password: String!
    $username: String!
    $firstName: String!
  ) {
    createUser(
      email: $email
      firstName: $firstName
      lastName: $lastName
      password: $password
      username: $username
    ) {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const GET_LOGGED_IN_USER = gql`
  query GetLoggedInUser {
    getLoggedInUser {
      _id
      bio
      role
      firstName
      lastName
      email
      trades
      username
      offers
      payments
      referrals
      fiat {
        id
        name
        sign
        symbol
      }
      avatar {
        _id
        size
        url
        filename
        timestamp
      }
      isVerified
      isEmailVerified
      referralCode
      isLocked
      isOnline
      createdAt
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $bio: String
    $fiat: String
    $lastName: String
    $firstName: String
  ) {
    updateUser(
      bio: $bio
      fiat: $fiat
      lastName: $lastName
      firstName: $firstName
    ) {
      _id
      role
      bio
      firstName
      lastName
      email
      trades
      username
      offers
      payments
      referrals
      fiat {
        id
        name
        sign
        symbol
      }
      avatar {
        _id
        size
        url
        filename
        timestamp
      }
      isVerified
      isEmailVerified
      referralCode
      isLocked
      isOnline
      createdAt
    }
  }
`;

export const CHANGE_AVATAR = gql`
  mutation ChangeAvatar($fileId: ID!) {
    changeAvatar(fileId: $fileId) {
      _id
      bio
      role
      firstName
      lastName
      email
      trades
      username
      offers
      payments
      referrals
      fiat {
        id
        name
        sign
        symbol
      }
      avatar {
        _id
        size
        url
        filename
        timestamp
      }
      isVerified
      isEmailVerified
      referralCode
      isLocked
      isOnline
      createdAt
    }
  }
`;
