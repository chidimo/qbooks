import {Outlet} from 'react-router-dom';

import {Cart} from './Cart';
import {Navbar} from './Navbar';
import {useCart} from 'src/context/CartContext';
import {useSearch} from 'src/context/SearchContext';
import styles from './container.module.scss';
import {SearchBoxMobile} from './SearchBoxMobile';

export const Container = () => {
  const cart = useCart();
  const search = useSearch();

  return (
    <>
      <Navbar />
      <div className={styles.parent}>
        <Outlet />
      </div>
      <Cart isOpen={cart.cartIsOpen} onRequestClose={cart.closeCart} />
      <SearchBoxMobile
        isOpen={search.searchOpen}
        onRequestClose={search.closeSearch}
      />
    </>
  );
};
