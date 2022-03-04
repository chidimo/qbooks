import clx from 'clsx';
import {useNavigate} from 'react-router-dom';

import styles from 'src/components/bookfeaturedview.module.scss';
import {BookType} from 'src/api/bookTypes';
import {BookRating} from './BookRating';

type Props = {
  book: BookType;
};

export const BookFeaturedCard = (props: Props) => {
  const {book} = props;
  const navigate = useNavigate();

  const isAvailable = book.available_copies > 0;

  return (
    <div
      className={styles.feature_container}
      onClick={() => navigate(`/book/${book.id}`)}>
      <div className={styles.image_container}>
        <img src={book.image_url} alt={book.title} />

        <div className={styles.feature_meta}>
          {isAvailable ? (
            <span className="text-success">Available</span>
          ) : (
            <span className="text-danger">Out of stock</span>
          )}

          <div className={clx('font-bold', [styles.title])}>{book.title}</div>

          <div>
            <p>{book.authors.map(a => a.name).join(', ')}</p>
            <p>{book.published_at?.substring(0, 4)}</p>
          </div>

          <div>
            <p className="font-bold">Genre</p>
            <p>{book.genres.map(g => g.name).join(', ')}</p>
          </div>

          <div>
            <p className="font-bold">Tags</p>
            <p>{book.tags.map(g => g.name).join(', ')}</p>
          </div>

          <BookRating book={book} iconFillLight={true} />
        </div>
      </div>
    </div>
  );
};
