import clx from 'clsx';
import {Link} from 'react-router-dom';

import {BooksIcon} from 'src/svg/BooksIcon';
import {CartIcon} from 'src/svg/CartIcon';

import {SearchBox} from 'src/components/SearchBox';
import styles from './navbar.module.scss';
import {SearchIcon} from 'src/svg/SearchIcon';
import {useCart} from 'src/context/CartContext';
import {useSearch} from 'src/context/SearchContext';

export const Navbar = () => {
  const cart = useCart();
  const mSearch = useSearch();

  return (
    <>
      <nav className={styles.navbar}>
        <div className={styles.navbar_wrapper}>
          <div className={styles.navbar_brand}>
            <a href="/">
              <div>
                <img src="https://via.placeholder.com/150?text=FB" alt="logo" />
              </div>
              <div>
                <p>Flimsy Books</p>
                <p className={styles.slogan}>A fictitious books company</p>
              </div>
            </a>
          </div>

          <SearchBox parent_class_name={clx([styles.hide_search_bar])} />

          <div className={styles.navbar_right}>
            <div
              className={styles.toggle_search_box}
              onClick={mSearch.openSearch}>
              <SearchIcon />
            </div>

            <div>
              <Link to="/">
                <BooksIcon />
              </Link>
            </div>
            <div
              onClick={cart.openCart}
              className={clx('cursor-pointer', [styles.cart_and_count])}>
              <p>
                <CartIcon width={24} height={24} />
              </p>
              {!cart.emptyCart && <p>{cart.cartItems.length}</p>}
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
