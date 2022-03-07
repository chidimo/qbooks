import {useSearchParams} from 'react-router-dom';

export const useUrlQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('searchTerm');

  const updateSearchTerm = (val: string) => setSearchParams({searchTerm: val});

  return {searchTerm, updateSearchTerm};
};
