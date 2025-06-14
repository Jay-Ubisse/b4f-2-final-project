"use client"

import { useState } from "react";
import { X, Minus, Plus } from "lucide-react";


import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useCart } from "../contexts/cartContext";


export const ShoppingCart = () => {
  const { isOpen, setIsOpen, cartItems, updateQuantity, removeItem } = useCart();
  const [acceptTerms, setAcceptTerms] = useState(false);

  if (!isOpen) return null;

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <>
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setIsOpen(false)}
      ></div>

      <div
        className="fixed right-0 top-0 h-full w-full max-w-md bg-white z-50 shadow-lg overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-4 bg-white border-b">
          <h2 className="text-sm font-mono uppercase tracking-wider">CART ({totalItems})</h2>
          <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-6 font-mono">
          {cartItems.length === 0 ? (
            <div className="text-center py-10">
              <p className="mb-4 text-sm text-gray-500">Seu carrinho está vazio.</p>
              <Button
                onClick={() => setIsOpen(false)}
                className="bg-black text-white px-6 py-2 rounded-none"
              >
                Ir para loja
              </Button>
            </div>
          ) : (
            cartItems.map((item) => (
              <div key={item._id} className="flex gap-4 pb-4 border-b">
                <img
                  src={item.imageUrl || "https://picsum.photos/80/100"} 
                  alt={item.name}
                  width={80}
                  height={96}
                  className="w-20 h-24 object-cover rounded"
                />
                <div className="flex-1 space-y-1">
                  <h3 className="text-xs font-medium">{item.name}</h3>
                  <p className="text-xs text-gray-600">Cor: {item.selectedColor}</p>
                  <p className="text-xs text-gray-600">Tamanho: {item.selectedSize}</p>
                  <p className="text-xs text-gray-600">Preço: ${(item.price).toFixed(2)}</p>

                  <div className="flex items-center justify-between pt-2">
                    <div className="flex items-center border rounded">
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="p-1 hover:bg-gray-100"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="px-3 py-1 text-sm min-w-[40px] text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-100"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>

                    <button
                      onClick={() => removeItem(item._id)}
                      className="text-xs text-gray-500 hover:text-gray-700 underline"
                    >
                      Remover
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="mt-auto p-4 bg-white border-t space-y-4 font-mono">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium">Total</span>
            <span className="text-lg font-medium">${totalPrice.toFixed(2)}</span>
          </div>

          <div className="text-xs text-gray-600 space-y-1">
            <p>Delivery <span className="underline">Calculated at checkout</span></p>
            <p>All sale items are final purchase</p>
          </div>

          <div className="flex items-start gap-2">
            <Checkbox
              id="terms"
              checked={acceptTerms}
              onCheckedChange={(checked) => setAcceptTerms(Boolean(checked))}
              className="mt-0.5"
            />
            <label htmlFor="terms" className="text-xs text-gray-600 leading-tight">
              I accept <span className="underline cursor-pointer">terms & conditions</span>.
            </label>
          </div>

          <Button
            className="w-full bg-gray-900 hover:bg-gray-800 text-white py-3 rounded-none"
            disabled={!acceptTerms || cartItems.length === 0}
          >
            Check out
          </Button>

          <div className="flex justify-center gap-2 pt-2">
            <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
              <div className="w-4 h-3 bg-white rounded-full"></div>
            </div>
            <div className="w-10 h-6 bg-blue-800 rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">VISA</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}