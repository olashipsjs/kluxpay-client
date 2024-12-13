import { gql } from '@apollo/client/core/core.cjs';

export const CREATE_USER = gql`
  mutation CreateUser($payload: CreateUserPayload!) {
    createUser(payload: $payload) {
      _id
      email
      firstName
      lastName
    }
  }
`;

export const GET_USER = gql`
  query GetUser {
    getUser {
      _id
      firstName
      lastName
      email
      dateOfBirth
      isVerified
      isEmailVerified
      referralCode
      isLocked
      isOnline
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($payload: UpdateUserPayload!) {
    updateUser(payload: $payload) {
      _id
      firstName
      lastName
      dateOfBirth
    }
  }
`;
