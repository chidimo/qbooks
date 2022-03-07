import clx from 'clsx';
import {Link, useParams} from 'react-router-dom';

import {useApi} from 'src/api/ApiContext';
import {BookRating} from 'src/components/BookRating';
import {useCart} from 'src/context/CartContext';
import styles from 'src/styles/book-detail.module.scss';
import {BackArrowIcon} from 'src/svg/BackArrowIcon';
import {CartIcon} from 'src/svg/CartIcon';
import {formatAsCurrency} from 'src/utils/formatAsCurrency';
import {formatDate, formatDateAsYear} from 'src/utils/formatDate';

const BookDetail = () => {
  const api = useApi();
  const cart = useCart();
  const {bookId} = useParams<Record<any, any>>();
  const {book, loading} = api.bookApi.query.useSingleBook(bookId);

  const tags = book.tags?.map(g => g.name).join(', ');
  const genres = book.genres?.map(g => g.name).join(', ');
  const authors = book.authors?.map(a => a.name).join(', ');

  const addToCart = () =>
    cart.addItemToCart({
      id: book.id,
      title: book.title,
      image_url: book.image_url,
      quantity: 1,
      price: book.price,
      author: authors,
    });

  if (loading && !book) {
    return <div>Loading book</div>;
  }

  return (
    <div className="text-14">
      <div className={styles.back_button}>
        <Link to="/">
          <BackArrowIcon /> <span>Back</span>
        </Link>
      </div>

      <div className={styles.book_container}>
        <div className={styles.book_cover}>
          <img src={book.image_url} alt={book.title} />

          <div className={styles.desktop_add_cart}>
            {book.outOfStock && (
              <div className="text-12 text-danger">Out of Stock</div>
            )}
            {!book.outOfStock && (
              <div className="text-12 text-success">
                {book.quantityInStock} Copies Available
              </div>
            )}

            <div className={styles.book_price}>
              {formatAsCurrency(book.price)}
            </div>

            {!book.outOfStock && (
              <button
                onClick={addToCart}
                type="button"
                className={clx(
                  [styles.desktop_add_to_cart_button],
                  [styles.add_to_cart_button],
                )}>
                <span>
                  <CartIcon width={25} height={25} fill="#fff" />
                </span>

                <span className={clx('text-left', [styles.add_text])}>
                  <span className="font-bold text-14">Add to Cart</span>
                  <br />
                </span>
              </button>
            )}
          </div>
        </div>

        <div className={styles.book_details}>
          <div className={clx('font-bold', [styles.book_title])}>
            {book.title}: {book.subtitle}
          </div>

          <div className={styles.author_and_year}>
            <div className={clx('font-bold text-14', [styles.book_author])}>
              {authors}
            </div>
            <div className={clx('text-14')}>
              {formatDateAsYear(book.published_at)}
            </div>
          </div>

          <div className="divider" />
          
          <div className={styles.book_meta}>
            <div className={styles.rating_section}>
              <BookRating book={book} />
            </div>

            <div className={clx('text-left', [styles.genre_section])}>
              <p className="font-bold">Genre</p>
              <p>{genres}</p>
            </div>

            <div className={clx('text-left', [styles.tag_section])}>
              <p className="font-bold">Tags</p>
              <p>{tags}</p>
            </div>

            <div className={clx('text-left', [styles.publisher_section])}>
              <p className="font-bold">Publisher</p>
              <p>{book.publisher}</p>
            </div>

            <div className={clx('text-left', [styles.release_section])}>
              <p className="font-bold">Released</p>
              <p>{formatDate(book.published_at)}</p>
            </div>
          </div>
          <div className="divider" />

          <pre className={styles.book_description}>{book.full_description}</pre>
        </div>
      </div>

      {!book.outOfStock && (
        <button
          onClick={addToCart}
          type="button"
          className={clx(
            [styles.mobile_add_to_cart_button],
            [styles.add_to_cart_button],
          )}>
          <span className="flex-center">
            <span>
              <CartIcon width={25} height={25} fill="#fff" />
            </span>

            <span className={clx('text-left', [styles.add_text])}>
              <span className="font-bold text-14">Add to Cart</span>
              <br />
              <span className="text-12 text-success">
                {book.quantityInStock} Copies Available
              </span>
            </span>
          </span>

          <span className={styles.book_price}>
            {formatAsCurrency(book.price)}
          </span>
        </button>
      )}
    </div>
  );
};

export default BookDetail;
