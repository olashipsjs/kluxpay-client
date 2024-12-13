import { gql } from '@apollo/client/core/core.cjs';

export const CREATE_PAYMENT = gql`
  mutation CreatePayment($payload: CreatePaymentPayload!) {
    createPayment(payload: $payload) {
      _id
      method
      bankName
      bankAccountName
      bankAccountNumber
      details
    }
  }
`;

export const GET_USER_PAYMENTS = gql`
  query GetUserPayments {
    getUserPayments {
      _id
      method
      bankName
      bankAccountName
      bankAccountNumber
      details
      createdBy {
        _id
        firstName
        lastName
      }
    }
  }
`;

export const GET_PAYMENT = gql`
  query GetPayments($id: String!) {
    getPayments(id: $id) {
      _id
      method
      bankName
      bankAccountName
      bankAccountNumber
      details
    }
  }
`;
