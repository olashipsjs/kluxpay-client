import { gql } from '@apollo/client';

export const GET_ALL_FIATS = gql`
  query GetAllFiats {
    getAllFiats {
      id
      name
      sign
      symbol
    }
  }
`;
