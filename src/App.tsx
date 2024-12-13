import { ApolloProvider } from '@apollo/client';
import Router from './Router';
import client from './lib/apolloClient';
import { HelmetProvider } from 'react-helmet-async';

function App() {
  return (
    <HelmetProvider>
      <ApolloProvider client={client}>
        <Router />
      </ApolloProvider>
    </HelmetProvider>
  );
}

export default App;
