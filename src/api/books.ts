import {gql, useQuery} from '@apollo/client';

import {booksQueryString} from './booksQuery';
import {BookAPI, UseBookListType, UseSingleBookType} from './bookTypes';

export const useBookApi = (): BookAPI => {
  return {
    query: {
      useBookList(): UseBookListType {
        const variables = {};

        const {data, loading, error} = useQuery(
          gql(booksQueryString.LIST_BOOKS),
          {
            variables,
            fetchPolicy: 'cache-and-network',
          },
        );

        return {error, loading, books: data?.books};
      },

      useSingleBook(id): UseSingleBookType {
        const variables = {id};

        const {data, loading, error} = useQuery(
          gql(booksQueryString.SINGLE_BOOK),
          {
            variables,
            fetchPolicy: 'cache-and-network',
          },
        );

        return {error, loading, book: data?.book};
      },
    },
  };
};
