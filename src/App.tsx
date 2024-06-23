import React from 'react';
import './App.css';
import RoutesConfig from './router'
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
function App() {
  const client = new ApolloClient({
    uri: 'https://api.github.com/graphql',
    cache: new InMemoryCache(),
    headers: {
      Authorization: `Bearer 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`,
    },
  });
  return (
    <ApolloProvider client={client}>
      <div>
        <RoutesConfig/>
      </div>
    </ApolloProvider>
  );
}

export default App;
