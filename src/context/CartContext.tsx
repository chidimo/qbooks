import {useApolloClient, gql} from '@apollo/client';
import {createContext, useContext, ReactNode, useState} from 'react';
import toast from 'react-hot-toast';

import {BookType} from 'src/api/bookTypes';

import {
  updateReactiveCart,
  useReactiveCartstate,
  addItemToReactiveCart,
} from 'src/reactive/cart';
import {formatAsCurrency} from 'src/utils/formatAsCurrency';
import {
  CartItemType,
  CartProps,
  CartUpdateType,
  IdType,
  ReadQuantityFragment,
} from './cartTypes';

const CartContext = createContext<CartProps | undefined>(undefined);

type Props = {children: ReactNode};

export function CartProvider({children}: Props) {
  const client = useApolloClient();
  const cartItemsReactive = useReactiveCartstate();

  const [cartIsOpen, setCartIsOpen] = useState(false);
  const openCart = () => setCartIsOpen(true);
  const closeCart = () => setCartIsOpen(false);

  const totalSum = cartItemsReactive.reduce(
    (total: any, next: CartItemType) =>
      total + Number(next.price) * Number(next.quantity),
    0,
  );

  const emptyCart = cartItemsReactive.length === 0;

  const fragment = gql`
    fragment Books on Books {
      available_copies
      quantityInStock @client
    }
  `;

  const readQuantity = (id: IdType): ReadQuantityFragment => {
    const data: BookType | null = client.cache.readFragment({
      id: `Books:${id}`,
      fragment,
    });
    return data ? data : {available_copies: 0, quantityInStock: 0};
  };

  const addItemToCart = (item: CartItemType) => {
    const {quantityInStock: q} = readQuantity(item.id);
    addItemToReactiveCart(item);

    client.cache.writeFragment({
      id: `Books:${item.id}`,
      fragment,
      data: {
        quantityInStock: q - item.quantity,
      },
    });
    openCart();
    toast.success(`${item.title} is now in your cart`);
  };

  const updateCartItem = (id: IdType, type: CartUpdateType) => {
    const {quantityInStock: q, available_copies: av} = readQuantity(id);

    if (type === 'increase' && q === 0) {
      toast.error('No more items in stock');
      return;
    }

    updateReactiveCart(id, type);

    let quantityInStock = q;
    if (type === 'increase') {
      quantityInStock -= 1;
    }
    if (type === 'decrease') {
      quantityInStock += 1;
    }
    if (type === 'remove') {
      quantityInStock = av;
    }

    client.cache.writeFragment({
      id: `Books:${id}`,
      fragment,
      data: {
        quantityInStock,
      },
    });
  };

  const checkout = () => {
    toast.success(`Checkout ${formatAsCurrency(totalSum)}`);
  };

  const value = {
    cartIsOpen,
    totalSum,
    cartItems: cartItemsReactive,
    emptyCart,
    openCart,
    closeCart,
    checkout,
    addItemToCart,
    updateCartItem,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
}
