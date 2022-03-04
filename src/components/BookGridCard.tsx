import clx from 'clsx';
import {useNavigate} from 'react-router-dom';

import {BookType} from 'src/api/bookTypes';
import {CartIcon} from 'src/svg/CartIcon';
import styles from './bookgridview.module.scss';
import {BookRating} from './BookRating';

type Props = {
  book: BookType;
};

export const BookGridCard = (props: Props) => {
  const {book} = props;
  const navigate = useNavigate();
  const isAvailable = book.available_copies > 0;

  return (
    <div
      onClick={() => navigate(`/book/${book.id}`)}
      className={clx([styles.parent])}>
      <div className={clx([styles.cover_image])}>
        <img src={book.image_url} alt={book.title} />
      </div>

      <div className={styles.meta_container}>
        <h3 className={styles.book_title}>{book.title}</h3>

        <span>
          {book.authors.map(a => a.name).join(', ')} -{' '}
          {book.published_at?.substring(0, 4)}
        </span>

        <span>{book.genres.map(g => g.name).join(', ')}</span>

        <BookRating book={book} />

        <div className={styles.price_container}>
          <span>${book.price}</span>
          <span>
            {book.available_copies > 0 ? (
              <span className="text-success ml-2">
                {book.available_copies} Copies Available
              </span>
            ) : (
              <span className="text-danger ml-2">Out of stock</span>
            )}
          </span>
        </div>

        <div
          onClick={e => {
            e.stopPropagation();

            if (!isAvailable) {
              return;
            }
            alert('Add to cart');
          }}
          className={clx('cursor-pointer', [styles.add_to_cart], {
            [styles.out_of_stock]: !isAvailable,
          })}>
          <CartIcon /> <span>Add to cart</span>
        </div>
      </div>
    </div>
  );
};
