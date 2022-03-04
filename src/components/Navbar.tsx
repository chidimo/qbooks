import clx from 'clsx';
import {useState} from 'react';
import {Link} from 'react-router-dom';

import {BooksIcon} from 'src/svg/BooksIcon';
import {CartIcon} from 'src/svg/CartIcon';

import {SearchBox} from 'src/components/SearchBox';
import styles from './navbar.module.scss';
import {SearchIcon} from 'src/svg/SearchIcon';
import {SearchBoxMobile} from './SearchBoxMobile';

export const Navbar = () => {
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);

  return (
    <>
      <SearchBoxMobile
        isOpen={mobileSearchVisible}
        onRequestClose={() => setMobileSearchVisible(false)}
      />

      <nav className={styles.navbar}>
        <div className={styles.navbar_wrapper}>
          <div className={styles.navbar_brand}>
            <a href="/">
              <div>
                <img src="https://via.placeholder.com/150?text=FB" alt="logo" />
              </div>
              <div>
                <p>Flimsy Books</p>
                <p className={styles.slogan}>A place to share your books</p>
              </div>
            </a>
          </div>

          <SearchBox
            parent_class_name={clx([styles.navbar_desktop_search_box])}
          />

          <div className={styles.navbar_right}>
            <div
              className={styles.toggle_search_box}
              onClick={() => setMobileSearchVisible(true)}>
              <SearchIcon />
            </div>

            <div>
              <Link to="/">
                <BooksIcon />
              </Link>
            </div>
            <div className={styles.cart_and_count}>
              <p>
                <CartIcon width={24} height={24} />
              </p>
              <p>3</p>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};
