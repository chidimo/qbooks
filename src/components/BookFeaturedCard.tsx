import clx from 'clsx';
import {useNavigate} from 'react-router-dom';

import styles from 'src/components/bookfeaturedcard.module.scss';
import {BookType} from 'src/api/bookTypes';
import {BookRating} from './BookRating';
import {formatDateAsYear} from 'src/utils/formatDate';

type Props = {
  book: BookType;
  isFirst: boolean;
  isLast: boolean;
};

export const BookFeaturedCard = (props: Props) => {
  const {book} = props;
  const navigate = useNavigate();

  return (
    <div
      className={clx([styles.feature_wrapper], {
        'ml-0': props.isFirst,
        'mr-0': props.isLast,
      })}
      onClick={() => navigate(`/book/${book.id}`)}>
      <div className={styles.image_wrapper}>
        <img src={book.image_url} alt={book.title} />

        <div className={styles.feature_meta}>
          {book.outOfStock ? (
            <span className="text-danger">Out of stock</span>
          ) : (
            <span className="text-success">Available</span>
          )}

          <div className={clx('font-bold', [styles.title])}>{book.title}</div>

          <div>
            <p>{book.authors.map(a => a.name).join(', ')}</p>
            <p>{formatDateAsYear(book.published_at)}</p>
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
