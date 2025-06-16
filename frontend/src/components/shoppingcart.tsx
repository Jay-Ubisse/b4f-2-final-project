"use client";

import { useState, useEffect } from "react";
import { X, Minus, Plus } from "lucide-react";
import { Link } from "react-router-dom";


import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { useCart } from "./../contexts/cartContext";

type CartProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const Cart = ({ isOpen, onClose }: CartProps) => {
  const { cartItems, updateQuantity, removeItem } = useCart();

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setVisible(true);
    } else {
      const timer = setTimeout(() => setVisible(false), 300);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!visible) return null;

  const totalItems = getTotalItems(cartItems);
  const totalPrice = getTotalPrice(cartItems);

  const renderHeader = () => (
    <div className="flex items-center justify-between p-4 border-b">
      <h2 className="text-sm font-mono uppercase tracking-wider">
        Cart ({totalItems})
      </h2>
      <button
        onClick={onClose}
        className="p-1 hover:bg-gray-100 rounded transition"
        aria-label="Close cart sidebar"
      >
        <X className="w-5 h-5" />
      </button>
    </div>
  );

  const renderCartItem = (item: typeof cartItems[0]) => (
    <div key={item._id} className="flex gap-4 border-b pb-4">
      <img
        src={item.imageUrl || "https://www.taibobacar.com/media/BR-MTS-DR.1-570x570.jpg"}
        alt={item.name}
        className="w-20 h-24 object-cover rounded"
      />
      <div className="flex-1 space-y-1">
        <h3 className="text-sm font-semibold">{item.name}</h3>
        <p className="text-xs text-gray-500">Color: {item.selectedColor}</p>
        <p className="text-xs text-gray-500">Size: {item.selectedSize}</p>
        <p className="text-xs text-gray-500">Price: ${item.price.toFixed(2)}</p>

        <div className="flex justify-between items-center pt-2">
          <QuantityControl
            quantity={item.quantity}
            onDecrease={() =>
              updateQuantity(item._id, item.selectedColor, item.selectedSize, item.quantity - 1)
            }
            onIncrease={() =>
              updateQuantity(item._id, item.selectedColor, item.selectedSize, item.quantity + 1)
            }
            disableDecrease={item.quantity <= 1}
          />

          <button
            onClick={() => removeItem(item._id, item.selectedColor, item.selectedSize)}
            className="text-xs text-gray-500 hover:text-red-500 underline"
            aria-label={`Remove ${item.name} from cart`}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  const renderEmptyCart = () => (
    <div className="text-center py-10 mt-[11rem] text-sm text-gray-500 space-y-4">
      <p className="font-mono">Your cart is empty.</p>

      <Button
        onClick={onClose}
        className="w-full bg-gray-900 text-white hover:bg-gray-800 transition-colors"
      >
        <Link to={"/shop"}>
          Back to shop
        </Link>
      </Button>

      <div className="flex justify-center items-center gap-2 text-xs text-gray-600">
        <Link to="/login" className="underline hover:text-black transition-colors">
          Log in
        </Link>
        <span className="font-mono">to have more experience</span>
      </div>
    </div>
  );

  const renderFooter = () => (
    <div className="p-4 border-t space-y-4 font-mono">
      <div className="flex justify-between text-sm font-medium">
        <span>Total</span>
        <span className="text-lg font-bold">${totalPrice.toFixed(2)}</span>
      </div>

      <div className="flex justify-between gap-4 text-xs text-gray-600">
        <p>
          Delivery <span className="underline">calculated at checkout</span>
        </p>
        <p className="text-right">All sale items are final purchase.</p>
      </div>

      <div className="flex items-start gap-2">
        <Checkbox
          id="terms"
          checked={acceptTerms}
          onCheckedChange={(checked) => setAcceptTerms(Boolean(checked))}
          className="mt-0.5"
        />
        <label htmlFor="terms" className="text-xs text-gray-600 leading-tight cursor-pointer">
          I accept <span className="underline">terms & conditions</span>.
        </label>
      </div>

      <Button
        className="w-full bg-gray-900 text-white py-3"
        disabled={!acceptTerms || cartItems.length === 0}
      >
        <Link to={"/checkout"}>
          Checkout
        </Link>
      </Button>

      <PaymentMethods />
    </div>
  );

  return (
    <aside
      className={`fixed right-0 top-0 h-full bg-white z-50 shadow-lg flex flex-col transform transition-transform duration-300
        w-full sm:max-w-sm
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      aria-label="Shopping cart sidebar"
    >
      {renderHeader()}

      <main className="flex-1 overflow-y-auto p-4 space-y-6 font-mono">
        {cartItems.length === 0 ? renderEmptyCart() : (
          <>
            {cartItems.map(renderCartItem)}
            {renderFooter()}
          </>
        )}
      </main>
    </aside>
  );
};

const getTotalItems = (items: { quantity: number }[]) =>
  items.reduce((acc, item) => acc + item.quantity, 0);

const getTotalPrice = (items: { price: number; quantity: number }[]) =>
  items.reduce((acc, item) => acc + item.price * item.quantity, 0);

type QuantityControlProps = {
  quantity: number;
  onDecrease: () => void;
  onIncrease: () => void;
  disableDecrease?: boolean;
};

const QuantityControl = ({
  quantity,
  onDecrease,
  onIncrease,
  disableDecrease = false,
}: QuantityControlProps) => (
  <div className="flex items-center border rounded">
    <button
      onClick={onDecrease}
      disabled={disableDecrease}
      className="p-1 hover:bg-gray-100 disabled:opacity-50"
      aria-label="Decrease quantity"
    >
      <Minus className="w-4 h-4" />
    </button>
    <span className="px-3 py-1 text-sm w-10 text-center">{quantity}</span>
    <button
      onClick={onIncrease}
      className="p-1 hover:bg-gray-100"
      aria-label="Increase quantity"
    >
      <Plus className="w-4 h-4" />
    </button>
  </div>
);

const PaymentMethods = () => (
  <div className="flex justify-center gap-2 pt-2">
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/0/04/Visa.svg"
      alt="Visa"
      className="w-10 h-6 object-contain"
    />
    <img
      src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
      alt="Mastercard"
      className="w-10 h-6 object-contain"
    />
  </div>
);
