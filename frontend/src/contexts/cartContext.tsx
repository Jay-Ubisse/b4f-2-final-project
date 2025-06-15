import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

export type CartItem = {
  _id: string;
  name: string;
  imageUrl?: string;
  price: number;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
  colors?: string[];
  sizes?: string[];
  description?: string;
};

type CartContextType = {
  cartItems: CartItem[];
  addToCart: (item: CartItem) => void;
  updateQuantity: (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => void;
  removeItem: (id: string, color: string, size: string) => void;
  clearCart: () => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const savedCart = localStorage.getItem("itemProducts");
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (error) {
        console.error("Erro ao carregar carrinho do localStorage:", error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("itemProducts", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (newItem: CartItem) => {
    const existingIndex = cartItems.findIndex(
      (item) =>
        item._id === newItem._id &&
        item.selectedColor === newItem.selectedColor &&
        item.selectedSize === newItem.selectedSize
    );

    if (existingIndex !== -1) {
      const updatedItems = [...cartItems];
      updatedItems[existingIndex].quantity += newItem.quantity;
      setCartItems(updatedItems);
    } else {
      setCartItems([...cartItems, newItem]);
    }
  };

  // Atualiza quantidade de um item
  const updateQuantity = (
    id: string,
    color: string,
    size: string,
    quantity: number
  ) => {
    const updatedItems = cartItems.map((item) =>
      item._id === id &&
      item.selectedColor === color &&
      item.selectedSize === size
        ? { ...item, quantity }
        : item
    );
    setCartItems(updatedItems);
  };

  const removeItem = (id: string, color: string, size: string) => {
    setCartItems(
      cartItems.filter(
        (item) =>
          !(
            item._id === id &&
            item.selectedColor === color &&
            item.selectedSize === size
          )
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
