import {useState, useEffect, useCallback, ChangeEvent} from 'react';
import _ from 'underscore';

export const useDebouncedSearch = (onChange: any) => {
  const debouncedSearch = useCallback(
    _.debounce((inp: any) => {
      onChange(inp);
    }, 500),
    [],
  );

  return {debouncedSearch};
};

type SearchBoxProps = {
  searchTerm?: string | null;
  placeholder?: string;
  onChange: (value:string) => void;
};

export const SearchBox = (props: SearchBoxProps): JSX.Element => {
  const {placeholder, searchTerm, onChange} = props;
  const [search, setSearch] = useState('');

  const {debouncedSearch} = useDebouncedSearch(onChange);

  useEffect(() => {
    setSearch(searchTerm || '');
  }, [searchTerm]);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const {value} = e.target;
    setSearch(value);
    debouncedSearch(value);
  };

  return (
    <div>
      <label htmlFor="search" aria-hidden="true"></label>
      <input
        id="search"
        name="search"
        type="search"
        value={search || ''}
        placeholder={placeholder}
        onChange={handleChange}
      />
    </div>
  );
};
