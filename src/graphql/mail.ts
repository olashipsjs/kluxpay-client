import { gql } from '@apollo/client/core/core.cjs';

export const SEND_MAIL = gql`
  mutation SendMail($payload: SendMailPayload!) {
    sendMail(payload: $payload)
  }
`;
