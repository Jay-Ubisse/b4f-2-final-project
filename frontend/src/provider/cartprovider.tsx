import React, { useState, useEffect } from "react";
import { CartContext } from "../contexts/cartContext";
import type { CartItem, ProductProps } from "../types/cart";

interface CartProviderProps {
  children: React.ReactNode;
}

export const CartProvider = ({ children }: CartProviderProps) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("cartItems");
    try {
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [isOpen, setIsOpen] = useState(false);

  // Salva no localStorage sempre que cartItems mudar
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (
    product: ProductProps,
    selectedColor: string,
    selectedSize: string,
    quantity: number
  ) => {
    if (!selectedColor || !selectedSize) {
      alert("Selecione uma cor e um tamanho");
      return;
    }

    const productToAdd = {
      _id: product._id,
      name: product.name,
      price: product.price ?? 0,
      imageUrl: product.imageUrl,
      quantity,
      selectedColor,
      selectedSize,
    };

    setCartItems((prev) => {
      const existingIndex = prev.findIndex(
        (item) =>
          item._id === product._id &&
          item.selectedColor === selectedColor &&
          item.selectedSize === selectedSize
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }

      return [...prev, productToAdd];
    });
  };

  const updateQuantity = (_id: string, quantity: number) => {
    if (quantity < 1) return;
    setCartItems((prev) =>
      prev.map((item) => (item._id === _id ? { ...item, quantity } : item)
    )
  )};

  const removeItem = (_id: string) => {
    setCartItems((prev) => prev.filter((item) => item._id !== _id));
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeItem,
    clearCart,
    isOpen,
    setIsOpen,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};