import {ApolloProvider, ApolloClient} from '@apollo/client';
import Modal from 'react-modal';

import {linkChain} from './appLinks';
import {ApiProvider} from './api/ApiContext';
import {InMemoryCache} from '@apollo/client/cache';
import {Toaster} from 'react-hot-toast';
import {AppRoutes} from './Routes';

Modal.setAppElement('#root');

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {},
    },
  },
});

const client = new ApolloClient({
  cache,
  link: linkChain,
  connectToDevTools: process.env.NODE_ENV === 'development' ? true : false,
  defaultOptions: {
    watchQuery: {fetchPolicy: 'cache-and-network'},
  },
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Toaster />
      <ApiProvider>
        <AppRoutes />
      </ApiProvider>
    </ApolloProvider>
  );
}

export default App;
