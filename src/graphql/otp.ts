import { gql } from '@apollo/client/core/core.cjs';

export const GENERATE_OTP = gql`
  mutation GenerateOtp($payload: GenerateOtpPayload!) {
    generateOtp(payload: $payload) {
      code
      expiresAt
    }
  }
`;

export const VERIFY_OTP = gql`
  mutation VerifyOtp($payload: VerifyOtpPayload!) {
    verifyOtp(payload: $payload) {
      code
      expiresAt
    }
  }
`;
