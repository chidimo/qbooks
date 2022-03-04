import clx from 'clsx';
import {useSearchParams} from 'react-router-dom';

import {useApi} from 'src/api/ApiContext';
import {BookGridCard} from 'src/components/BookGridCard';
import styles from 'src/styles/index.module.scss';
import {BookType} from 'src/api/bookTypes';
import {BookFeaturedCard} from 'src/components/BookFeaturedCard';

const Home = () => {
  const api = useApi();
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get('searchTerm');

  const {
    books: allBooks,
    loading,
    totalBooks,
  } = api.bookApi.query.useBookList({
    searchTerm,
  });
  const {books: featuredBooks, loading: loadingFeatured} =
    api.bookApi.query.useBookList({
      featured: true,
    });

  return (
    <>
      <div
        className={clx([styles.featured_section], {
          [styles.featured_hide]: searchTerm,
        })}>
        <p className={clx('font-bold text-14', [styles.featured_header])}>
          Featured books
        </p>
        <hr />

        <div className={styles.featured_content}>
          {loadingFeatured && !featuredBooks && (
            <p className={styles.featured_loader}>Loading featured books</p>
          )}

          <div className={clx([styles.featured_carousel])}>
            {featuredBooks?.map((book: BookType) => {
              return <BookFeaturedCard key={book.id} book={book} />;
            })}
          </div>
        </div>
      </div>

      <div>
        {searchTerm ? (
          <p className="text-14">
            <span className="font-bold">{totalBooks} results </span>found for{' '}
            <span className="font-bold">&apos;{searchTerm}&apos;</span>
          </p>
        ) : (
          <p className="font-bold text-14">All books</p>
        )}

        <hr />

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
