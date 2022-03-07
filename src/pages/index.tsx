import clx from 'clsx';
import {useRef, useState} from 'react';

import {useApi} from 'src/api/ApiContext';
import {BookGridCard} from 'src/components/BookGridCard';
import styles from 'src/styles/index.module.scss';
import {BookType} from 'src/api/bookTypes';
import {BookFeaturedCard} from 'src/components/BookFeaturedCard';
import {PreviousIcon} from 'src/svg/PreviousIcon';
import {NextIcon} from 'src/svg/NextIcon';
import {useUrlQuery} from 'src/hooks/useUrlQuery';

const Home = () => {
  const api = useApi();
  const {searchTerm} = useUrlQuery();
  const [activeDot, setActiveDot] = useState(0);
  const featuredRef = useRef<HTMLDivElement | null>(null);

  const {
    books: allBooks,
    loading,
    totalBooks,
  } = api.bookApi.query.useBookList({
    searchTerm,
  });
  const {
    books: featuredBooks,
    loading: loadingFeatured,
    totalBooks: totalFeatured,
  } = api.bookApi.query.useBookList({
    featured: true,
  });

  const scrollStep = 330; // width of a featured card

  type ScrollType = 'previous' | 'next';
  const handleArrowClick = (direction: ScrollType) => {
    if (featuredRef.current) {
      let indicator = 0;
      let scroll = scrollStep;

      if (direction === 'previous') {
        scroll = -scrollStep;
        indicator = activeDot - 1;
      }
      if (direction === 'next') {
        scroll = scrollStep;
        indicator = activeDot + 1;
      }
      featuredRef.current.scrollLeft += scroll;
      setActiveDot(indicator);
    }
  };

  const handleIndicatorClick = (index: number) => {
    // on another day we would write a better algorithm for this
    // probably based on intersection observer
    if (featuredRef.current) {
      const currentLeft = featuredRef.current.scrollLeft;
      const scrollDiff = index * scrollStep - currentLeft;
      featuredRef.current.scrollLeft += scrollDiff;
    }
  };

  return (
    <>
      <div
        className={clx([styles.featured_section], {
          [styles.featured_hide]: searchTerm,
        })}>
        <div className="container">
          <p className={clx('font-bold text-14', [styles.featured_header])}>
            Featured books
          </p>

          <div className="divider" />
        </div>

        <div className={styles.featured_content}>
          {loadingFeatured && !featuredBooks && (
            <p className={styles.featured_loader}>Loading featured books</p>
          )}

          <div
            onClick={() => handleArrowClick('previous')}
            className={clx([styles.left_arrow], [styles.feature_scroll_arrow])}>
            <PreviousIcon />
          </div>

          <div
            ref={node => (featuredRef.current = node)}
            className={clx('hide_scrollbar', [styles.featured_carousel])}>
            {featuredBooks?.map((book: BookType, index: number) => {
              return (
                <BookFeaturedCard
                  key={book.id}
                  book={book}
                  isFirst={index === 0}
                  isLast={index === totalFeatured - 1}
                />
              );
            })}
          </div>

          <div
            onClick={() => handleArrowClick('next')}
            className={clx(
              [styles.right_arrow],
              [styles.feature_scroll_arrow],
            )}>
            <NextIcon />
          </div>

          <div className={styles.scroll_indicators}>
            {featuredBooks?.map((f, i) => {
              return (
                <div
                  key={f.id}
                  onClick={() => {
                    setActiveDot(i);
                    handleIndicatorClick(i);
                  }}
                  className={clx('cursor-pointer', {
                    [styles.active_dot]: i === activeDot,
                  })}
                />
              );
            })}
          </div>
        </div>
      </div>

      <div className="container">
        <div className={styles.all_section_heading}>
          {searchTerm ? (
            <p className="text-14">
              <span className="font-bold">{totalBooks} results </span>found for{' '}
              <span className="font-bold">&apos;{searchTerm}&apos;</span>
            </p>
          ) : (
            <p className="font-bold text-14">All books</p>
          )}
        </div>

        <div className="divider" />

        {loading && !allBooks && (
          <p>{searchTerm ? 'Searching' : 'Loading all'} books</p>
        )}

        <div className={styles.book_grid}>
          <ul role="list" className={styles.book_list}>
            {allBooks?.map((book: BookType) => (
              <li key={book.id} className={styles.book_grid_item}>
                <BookGridCard book={book} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
export default Home;
