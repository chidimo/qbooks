import {useState, useEffect, ChangeEvent, useRef} from 'react';
import clx from 'clsx';

import styles from './searchbox.module.scss';
import {SearchIcon} from 'src/svg/SearchIcon';
import {CloseIcon} from 'src/svg/CloseIcon';
import {useUrlQuery} from 'src/hooks/useUrlQuery';
import {useDebouncedSearch} from 'src/hooks/useDebouncedSearch';

type SearchBoxProps = {
  parent_class_name?: string;
};

export const SearchBox = (props: SearchBoxProps): JSX.Element => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [value, setValue] = useState<string | null>(null);

  const {searchTerm, updateSearchTerm} = useUrlQuery();
  const {debouncedSearch} = useDebouncedSearch((val: string) =>
    updateSearchTerm(val),
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
    <div className={clx([props.parent_class_name], [styles.search_wrapper])}>
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
            updateSearchTerm('');
            inputRef.current?.focus();
          }
        }}
        className={clx('cursor-pointer', [styles.search_box_icons])}>
        {value ? <CloseIcon /> : <SearchIcon />}
      </div>
    </div>
  );
};
