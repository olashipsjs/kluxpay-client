import { gql } from '@apollo/client';

export const SEND_MAIL = gql`
  mutation SendMail(
    $data: JSON
    $subject: String!
    $template: String!
    $recipients: String!
  ) {
    sendMail(
      data: $data
      subject: $subject
      template: $template
      recipients: $recipients
    )
  }
`;
