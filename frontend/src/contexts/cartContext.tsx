import  { createContext, useContext } from "react";
import type { CartItem } from "../types/cart";

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: ProductProps, color: string, size: string, quantity: number) => void;
  updateQuantity: (_id: string, quantity: number) => void;
  removeItem: (_id: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export interface ProductProps {
  _id: string;
  name: string;
  price?: number;
  colors?: string[];
  sizes?: string[];
  imageUrl?: string;
}

export const CartContext = createContext<CartContextType | undefined>(undefined);

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
};