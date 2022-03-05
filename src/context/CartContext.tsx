import {createContext, useContext, ReactNode, useState} from 'react';
import {
  addItemToReactiveCart,
  ReactiveCartUpdatetype,
  updateReactiveCart,
  useReactiveCartstate,
} from 'src/reactive/cart';
import {CartItemType} from './cartTypes';

type CartProps = {
  emptyCart: boolean;
  cartIsOpen: boolean;
  totalSum: number;
  cartItems: CartItemType[];
  checkout: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItemToCart: (item: CartItemType) => void;
  updateCartItem: (id: string | number, type: ReactiveCartUpdatetype) => void;
};

const CartContext = createContext<CartProps | undefined>(undefined);

type Props = {children: ReactNode};

export function CartProvider({children}: Props) {
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

  const updateCartItem = (id: string | number, type: ReactiveCartUpdatetype) =>
    updateReactiveCart(id, type);

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
