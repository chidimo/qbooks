import {Outlet} from 'react-router-dom';
import {useCart} from 'src/context/CartContext';
import {Cart} from './Cart';

import styles from './container.module.scss';
import {Navbar} from './Navbar';

export const Container = () => {
  const cart = useCart();

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Outlet />
      </div>
      <Cart isOpen={cart.cartIsOpen} onRequestClose={cart.closeCart} />
    </>
  );
};
