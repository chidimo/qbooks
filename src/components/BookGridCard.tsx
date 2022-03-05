import clx from 'clsx';
import {useNavigate} from 'react-router-dom';

import {BookType} from 'src/api/bookTypes';
import {useCart} from 'src/context/CartContext';
import {CartIcon} from 'src/svg/CartIcon';
import {formatAsCurrency} from 'src/utils/formatAsCurrency';
import styles from './bookgridview.module.scss';
import {BookRating} from './BookRating';

type Props = {
  book: BookType;
};

export const BookGridCard = (props: Props) => {
  const {book} = props;
  const cart = useCart();
  const navigate = useNavigate();

  const genres = book.genres.map(g => g.name).join(', ');
  const authors = book.authors.map(a => a.name).join(', ');

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
          {authors} - {book.published_at?.substring(0, 4)}
        </span>

        <span>{genres}</span>

        <BookRating book={book} />

        <div className={styles.price_container}>
          <span>{formatAsCurrency(book.price)}</span>
          <span>
            {book.availableForSale ? (
              <span className="text-success ml-2">
                {book.sellableQuantity} Copies Available
              </span>
            ) : (
              <span className="text-danger ml-2">Out of stock</span>
            )}
          </span>
        </div>

        <div
          onClick={e => {
            e.stopPropagation();

            if (!book.availableForSale) {
              return;
            }
            cart.addItemToCart({
              id: book.id,
              title: book.title,
              image_url: book.image_url,
              quantity: 1,
              price: book.price,
              author: authors,
            });
          }}
          className={clx('cursor-pointer', [styles.add_to_cart], {
            [styles.out_of_stock]: !book.availableForSale,
          })}>
          <CartIcon /> <span>Add to cart</span>
        </div>
      </div>
    </div>
  );
};
