import { gql } from '@apollo/client';

export const GENERATE_OTP = gql`
  mutation GenerateOtp($email: String!) {
    generateOtp(email: $email)
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($email: String!, $code: String!) {
    verifyOtp(email: $email, code: $code)
  }
`;
