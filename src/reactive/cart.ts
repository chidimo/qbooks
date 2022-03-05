import {makeVar, ReactiveVar, useReactiveVar} from '@apollo/client';

import {CartItemType} from 'src/context/cartTypes';

const initState: CartItemType[] = [];
const flimsy_cart = 'flimsy_cart';
const cartInStorage = localStorage.getItem(flimsy_cart);

const reactiveCartState: ReactiveVar<CartItemType[]> = makeVar<CartItemType[]>(
  cartInStorage ? JSON.parse(cartInStorage) : initState,
);

export const addItemToReactiveCart = (value: CartItemType) => {
  const state = reactiveCartState();
  const itemExists = state.find((it: CartItemType) => it.id === value.id);

  let current = state;

  if (itemExists) {
    current = state.map((itm: CartItemType) =>
      itm.id === value.id ? {...itm, quantity: itm.quantity + 1} : itm,
    );
  } else {
    current = state.concat(value);
  }

  reactiveCartState(current);
  localStorage.setItem(flimsy_cart, JSON.stringify(current));
};

export declare type ReactiveCartUpdatetype = 'increase' | 'decrease' | 'remove';

export const updateReactiveCart = (
  id: string | number,
  updateType: ReactiveCartUpdatetype,
) => {
  const state = reactiveCartState();
  let current = state;

  if (updateType === 'increase') {
    current = state.map((itm: CartItemType) =>
      itm.id === id ? {...itm, quantity: itm.quantity + 1} : itm,
    );
  }

  if (updateType === 'decrease') {
    const existing = state.find((it: CartItemType) => it.id === id);

    if (existing?.quantity === 1) {
      current = state.filter((it: CartItemType) => it.id !== id);
    } else {
      current = state.map((itm: CartItemType) =>
        itm.id === id ? {...itm, quantity: itm.quantity - 1} : itm,
      );
    }
  }

  if (updateType === 'remove') {
    current = state.filter((it: CartItemType) => it.id !== id);
  }

  reactiveCartState(current);
  localStorage.setItem(flimsy_cart, JSON.stringify(current));
};

export const useReactiveCartstate = (): CartItemType[] =>
  useReactiveVar(reactiveCartState);
