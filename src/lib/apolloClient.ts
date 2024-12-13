import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('kp_access_token');

  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(
    new HttpLink({
      uri: import.meta.env.VITE_APOLLO_SERVER_URI!,
      credentials: 'include',
    })
  ),
  cache: new InMemoryCache(),
});

export default client;
