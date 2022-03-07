import clx from 'clsx';

import {useCart} from 'src/context/CartContext';
import {CartItemType} from 'src/context/cartTypes';
import {BackArrowIcon} from 'src/svg/BackArrowIcon';
import {CartIcon} from 'src/svg/CartIcon';
import {formatAsCurrency} from 'src/utils/formatAsCurrency';
import styles from './cart.module.scss';
import {CartItem} from './CartItem';
import {ModalComponent} from './ModalComponent';

type Props = {
  isOpen: boolean;
  onRequestClose: () => void;
};

export const Cart = (props: Props) => {
  const cart = useCart();

  return (
    <ModalComponent isOpen={props.isOpen} onRequestClose={props.onRequestClose}>
      <div className={styles.cart_container}>
        <div className={styles.cart_header}>
          <div
            onClick={props.onRequestClose}
            className={clx('cursor-pointer', [styles.cart_go_back])}>
            <BackArrowIcon /> <span className="font-bold">Back</span>
          </div>
          <div className={styles.cart_title}>
            <span>Your Cart</span> <CartIcon />
          </div>
        </div>

        <div
          className={clx([styles.cart_items_wrapper], {
            'flex-center': cart.emptyCart,
          })}>
          {cart.emptyCart && <p>Your cart is empty</p>}

          <div className={styles.cart_items_list}>
            {cart.cartItems.map((item: CartItemType) => {
              return <CartItem key={item.id} item={item} />;
            })}
          </div>

          {!cart.emptyCart && (
            <>
              <div className={styles.overall_sum}>
                <span>Subtotal</span>
                <span>{formatAsCurrency(cart.totalSum)}</span>
              </div>

              <button
                type="button"
                onClick={cart.checkout}
                className={clx('cursor-pointer', [styles.checkout])}>
                <CartIcon fill="#fff" /> <span>Proceed to Checkout</span>
              </button>
            </>
          )}
        </div>
      </div>
    </ModalComponent>
  );
};
