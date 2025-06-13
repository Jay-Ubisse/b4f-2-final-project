/*export interface CartItem {
  productId: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}*/


export interface  ProductPropss  {
  id: number;
  name: string
  image:string;
  quantity: number;
  size: string;
  color: string;
  price: number;
}

export  interface CartProps {
  cart: number;
  total: number;
}

