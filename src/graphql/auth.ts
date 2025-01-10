import { gql } from '@apollo/client';

export const LOGIN = gql`
  mutation Login($email: String!, $password: String!) {
    login(email: $email, password: $password)
  }
`;

export const RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!, $newPassword: String!) {
    resetPassword(email: $email, newPassword: $newPassword)
  }
`;

export const VERIFY_EMAIL = gql`
  mutation VerifyEmail {
    verifyEmail
  }
`;

export const REFRESH_ACCESS_TOKEN = gql`
  query RefreshAccessToken {
    refreshAccessToken
  }
`;

export const CHANGE_EMAIL = gql`
  mutation ChangeEmail($newEmail: String!) {
    changeEmail(newEmail: $newEmail)
  }
`;

export const CHANGE_PASSWORD = gql`
  mutation ChangePassword($oldPassword: String!, $newPassword: String!) {
    changePassword(oldPassword: $oldPassword, newPassword: $newPassword)
  }
`;

export const CHANGE_USERNAME = gql`
  mutation ChangeUsername($username: String!) {
    changeUsername(username: $username)
  }
`;
