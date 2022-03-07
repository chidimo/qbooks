import clx from 'clsx';

import styles from 'src/components/cartitem.module.scss';
import {useCart} from 'src/context/CartContext';
import {CartItemType} from 'src/context/cartTypes';
import {formatAsCurrency} from 'src/utils/formatAsCurrency';

type Props = {
  item: CartItemType;
};

export const CartItem = (props: Props) => {
  const {item} = props;
  const cart = useCart();

  return (
    <div className="font-14">
      <div className={styles.item_container}>
        <div className={styles.item_details}>
          <div className={styles.cart_item_image}>
            <img src={item.image_url} alt={item.title} />
          </div>

          <div className={styles.item_meta}>
            <div>
              <div
                title={item.title}
                className={clx('text-14 font-bold', [styles.item_title])}>
                {item.title}
              </div>
              <div className={clx('text-14', [styles.item_author])}>
                {item.author}
              </div>
            </div>
            <div
              className="cursor-pointer"
              onClick={() => cart.updateCartItem(item.id, 'remove')}>
              Remove
            </div>
          </div>
        </div>

        <div className={styles.item_pricing}>
          <div className={styles.item_price}>
            {formatAsCurrency(item.price)}
          </div>
          <div className={styles.controls}>
            <button
              onClick={() => cart.updateCartItem(item.id, 'decrease')}
              type="button">
              -
            </button>
            <button type="button">{item.quantity}</button>
            <button
              onClick={() => cart.updateCartItem(item.id, 'increase')}
              type="button">
              +
            </button>
          </div>
          <div className={clx('font-bold', [styles.item_sum])}>
            {formatAsCurrency(item.quantity * Number(item.price))}
          </div>
        </div>
      </div>

      <div className={styles.item_divider} />
    </div>
  );
};
