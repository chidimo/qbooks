import {createContext, useContext, ReactNode} from 'react';
import {useBookApi} from './books';
import {BookAPI} from './bookTypes';

type APIProps = {
  bookApi: BookAPI;
};

const ApiContext = createContext<APIProps | undefined>(undefined);

type Props = {children: ReactNode};

export function ApiProvider({children}: Props) {
  const value = {
    bookApi: useBookApi(),
  };

  return <ApiContext.Provider value={value}>{children}</ApiContext.Provider>;
}

export function useApi() {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within ApiProvider');
  }
  return context;
}
