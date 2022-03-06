import {useApolloClient, gql} from '@apollo/client';
import {createContext, useContext, ReactNode, useState} from 'react';

import {
  updateReactiveCart,
  useReactiveCartstate,
  addItemToReactiveCart,
} from 'src/reactive/cart';
import {CartItemType, CartProps, CartUpdateType, IdType} from './cartTypes';

const CartContext = createContext<CartProps | undefined>(undefined);

type Props = {children: ReactNode};

export function CartProvider({children}: Props) {
  const client = useApolloClient();
  console.log('client', client);
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

  const addItemToCart = (item: CartItemType) => {
    addItemToReactiveCart(item);
    openCart();
  };

  const updateCartItem = (id: IdType, type: CartUpdateType) => {
    updateReactiveCart(id, type);
    const fragment = {
      id: `Books:${id}`,
      fragment: gql`
        fragment Books on Books {
          quantityInStock @client
        }
      `,
      data: {
        quantityInStock: 0,
      },
    };
    client.cache.writeFragment(fragment);
  };

  const checkout = () => {
    alert(`Checkout ${totalSum}`);
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
