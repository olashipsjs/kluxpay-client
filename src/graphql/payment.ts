import { gql } from '@apollo/client';

export const CREATE_PAYMENT = gql`
  mutation CreatePayment(
    $method: String!
    $details: String!
    $bankName: String!
    $bankAccountName: String!
    $bankAccountNumber: String!
  ) {
    createPayment(
      method: $method
      bankName: $bankName
      details: $details
      bankAccountName: $bankAccountName
      bankAccountNumber: $bankAccountNumber
    ) {
      _id
      method
      bankName
      bankAccountName
      bankAccountNumber
      details
    }
  }
`;

export const UPDATE_PAYMENT = gql`
  mutation UpdatePayment(
    $paymentId: ID!
    $method: String!
    $details: String!
    $bankName: String!
    $bankAccountName: String!
    $bankAccountNumber: String!
  ) {
    updatePayment(
      method: $method
      details: $details
      bankName: $bankName
      paymentId: $paymentId
      bankAccountName: $bankAccountName
      bankAccountNumber: $bankAccountNumber
    ) {
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
