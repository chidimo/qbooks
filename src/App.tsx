import {ApolloProvider, ApolloClient} from '@apollo/client';
import {InMemoryCache} from '@apollo/client/cache';
import Modal from 'react-modal';
import {Toaster} from 'react-hot-toast';

import {linkChain} from './appLinks';
import {ApiProvider} from './api/ApiContext';
import {AppRoutes} from './Routes';
import {CartProvider} from './context/CartContext';
import {CartItemType} from './context/cartTypes';
import {SearchProvider} from './context/SearchContext';

Modal.setAppElement('#root');

export const cache = new InMemoryCache({
  typePolicies: {
    Books: {
      fields: {
        outOfStock: {
          read(_, {readField}) {
            const saleable = readField('quantityInStock');
            if (!saleable) {
              return true;
            }
            return saleable < 1;
          },
        },
        quantityInStock: {
          read(_, data) {
            const {readField} = data;
            const bookId = readField('id');
            const copies_from_server =
              Number(readField('available_copies')) || 0;

            const savedCart = localStorage.getItem('flimsy_cart');
            const cart = savedCart ? JSON.parse(savedCart) : [];

            const itemInCart = cart.find(
              (it: CartItemType) => it.id === bookId,
            );
            const remainingQuantity = itemInCart
              ? copies_from_server - itemInCart.quantity
              : copies_from_server;

            return remainingQuantity;
          },
        },
      },
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
        <SearchProvider>
          <CartProvider>
            <AppRoutes />
          </CartProvider>
        </SearchProvider>
      </ApiProvider>
    </ApolloProvider>
  );
}

export default App;
