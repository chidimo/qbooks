import {useState, useEffect, useCallback, ChangeEvent, useRef} from 'react';
import {useSearchParams} from 'react-router-dom';
import _ from 'underscore';
import clx from 'clsx';

import styles from './searchbox.module.scss';
import {SearchIcon} from 'src/svg/SearchIcon';
import {CloseIcon} from 'src/svg/CloseIcon';

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
  parent_class_name?: string;
};

export const SearchBox = (props: SearchBoxProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string | null>(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTerm = searchParams.get('searchTerm');

  const {debouncedSearch} = useDebouncedSearch((val: string) =>
    setSearchParams({searchTerm: val}),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setValue(v);
    debouncedSearch(v);
  };

  useEffect(() => {
    if (searchTerm) {
      setValue(searchTerm);
    }
  }, []);

  return (
    <div className={clx([props.parent_class_name], [styles.search_container])}>
      <label htmlFor="search" aria-hidden="true"></label>
      <input
        id="search"
        name="search"
        type="text"
        role="search"
        ref={node => (inputRef.current = node)}
        className={clx([styles.search_input])}
        value={value || ''}
        placeholder="Search books, genres, authors, etc."
        onChange={handleChange}
      />
      <div
        onClick={() => {
          if (searchTerm) {
            setValue('');
            setSearchParams({searchTerm: '' as any});
            inputRef.current?.focus();
          }
        }}
        className={clx('cursor-pointer', [styles.search_box_icons])}>
        {value ? <CloseIcon /> : <SearchIcon />}
      </div>
    </div>
  );
};
