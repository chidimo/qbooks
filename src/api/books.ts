import {gql, useQuery} from '@apollo/client';

import {booksQueryString} from './booksQuery';
import {
  BookAPI,
  UseBookListType,
  UseSingleBookType,
  WhereClauseType,
} from './bookTypes';

export const useBookApi = (): BookAPI => {
  return {
    query: {
      useBookList({
        featured,
        searchTerm,
      }: WhereClauseType = {}): UseBookListType {
        const where: any = {featured};
        if (searchTerm) {
          const _or = [
            {title: searchTerm},
            {tags: {name: searchTerm}},
            {genres: {name: searchTerm}},
            {authors: {name: searchTerm}},
          ];
          where._or = _or;
        }

        const {data, loading, error} = useQuery(
          gql(booksQueryString.LIST_BOOKS),
          {
            variables: {where},
            fetchPolicy: 'cache-and-network',
          },
        );

        return {
          error,
          loading,
          books: data?.books,
          totalBooks: data?.books.length,
        };
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

        return {error, loading, book: data?.book || {}};
      },
    },
  };
};
