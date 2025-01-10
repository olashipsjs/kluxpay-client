import { gql } from '@apollo/client';

export const GET_ALL_TICKETS = gql`
  query GetAllTickets {
    getAllTickets {
      _id
      priority
      status
      title
      name
      category
      ticketId
      description
      user {
        lastName
        firstName
        username
        email
      }
      createdAt
    }
  }
`;

export const CREATE_TICKET = gql`
  mutation CreateTicket(
    $name: String!
    $email: String!
    $title: String!
    $priority: String!
    $category: String!
    $description: String!
  ) {
    createTicket(
      name: $name
      email: $email
      title: $title
      priority: $priority
      category: $category
      description: $description
    ) {
      _id
      priority
      status
      title
      name
      category
      ticketId
      description
      user {
        lastName
        firstName
        username
        email
      }
      createdAt
    }
  }
`;

export const CHANGE_TICKET_STATUS = gql`
  mutation ChangeTicketStatus($ticketId: ID!, $status: String!) {
    changeTicketStatus(ticketId: $ticketId, status: $status) {
      _id
      priority
      status
      title
      name
      category
      ticketId
      description
      user {
        lastName
        firstName
        username
        email
      }
      createdAt
    }
  }
`;
