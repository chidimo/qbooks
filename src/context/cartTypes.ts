export declare type IdType = string | number;

export declare type CartItemType = {
  id: IdType;
  title: string;
  image_url: string;
  quantity: number;
  price: number;
  author: string;
};

export declare type ReadQuantityFragment = {
  available_copies: number;
  quantityInStock: number;
};

export declare type CartUpdateType = 'increase' | 'decrease' | 'remove';

export declare type CartProps = {
  emptyCart: boolean;
  cartIsOpen: boolean;
  totalSum: number;
  cartItems: CartItemType[];
  checkout: () => void;
  openCart: () => void;
  closeCart: () => void;
  addItemToCart: (item: CartItemType) => void;
  updateCartItem: (id: IdType, type: CartUpdateType) => void;
};
