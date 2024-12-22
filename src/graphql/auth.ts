import { gql } from '@apollo/client/core/core.cjs';

export const SIGN_IN = gql`
  mutation SignIn($payload: SignInPayload!) {
    signIn(payload: $payload) {
      accessToken
    }
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($payload: ResetPasswordPayload!) {
    resetPassword(payload: $payload)
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail($payload: VerifyEmailPayload!) {
    verifyEmail(payload: $payload)
  }
`;

export const REFRESH_ACCESS_TOKEN = gql`
  query RefreshAccessToken {
    refreshAccessToken
  }
`;

export const CHANGE_EMAIL = gql`
  mutation ChangeEmail($payload: ChangeEmailPayload!) {
    changeEmail(payload: $payload)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($payload: ChangePasswordPayload!) {
    changePassword(payload: $payload)
  }
`;
