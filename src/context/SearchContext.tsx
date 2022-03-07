import {createContext, useContext, ReactNode, useState} from 'react';

type ValueProps = {
  searchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;
};

const SearchContext = createContext<ValueProps | undefined>(undefined);

type Props = {children: ReactNode};

export function SearchProvider({children}: Props) {
  const [searchOpen, setSearchIsOpen] = useState(false);
  const openSearch = () => setSearchIsOpen(true);
  const closeSearch = () => setSearchIsOpen(false);

  const value = {
    searchOpen,
    openSearch,
    closeSearch,
  };

  return (
    <SearchContext.Provider value={value}>
      {children}
    </SearchContext.Provider>
  );
}

export function useSearch() {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within SearchProvider');
  }
  return context;
}
