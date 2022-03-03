import {HttpLink, from} from '@apollo/client';
import {setContext} from '@apollo/client/link/context';
import {onError} from '@apollo/client/link/error';
import apolloLogger from 'apollo-link-logger';
import toast from 'react-hot-toast';

const httpLink = new HttpLink({
  uri: 'https://quidax-feec-graphql.herokuapp.com/graphql',
});

const authLink = () =>
  setContext((_, {headers}) => {
    return {
      headers: {
        ...headers,
      },
    };
  });

const errorLink = () => {
  return onError(({graphQLErrors, networkError}) => {
    if (networkError) {
      const {message} = networkError;
      if (message) {
        toast.error(message);
      }
    }

    if (graphQLErrors) {
      graphQLErrors.forEach(data => {
        const {message} = data;
        toast.error(message);
      });
    }
  });
};

const chain = [authLink(), errorLink(), httpLink];

export const linkChain = from(
  process.env.NODE_ENV === 'development' ? [apolloLogger, ...chain] : chain,
);
