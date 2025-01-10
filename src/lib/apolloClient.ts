import { ApolloClient, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('kp_access_token');

  return {
    headers: {
      ...headers,
      'apollo-require-preflight': true,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(
    createUploadLink({
      credentials: 'include',
      uri: 'http://localhost:5500/api/graphql',
      // uri: import.meta.env.VITE_APOLLO_SERVER_URI!,
    })
  ),
  cache: new InMemoryCache(),
});

export default client;
