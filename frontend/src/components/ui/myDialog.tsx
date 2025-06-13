"use client"

import { useState } from "react"
import { X, Minus, Plus } from "lucide-react"
import { Button } from "./button"
import { Checkbox } from "./checkbox"

interface CartItem {
  id: string
  name: string
  material: string
  size: string
  color: string
  originalPrice: number
  salePrice: number
  quantity: number
  image: string
}

export default function ShoppingCart() {
  const [isOpen, setIsOpen] = useState(false) // Mudança de true para false
  const [acceptTerms, setAcceptTerms] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: "1",
      name: "1011 HEAVYWEIGHT L/S T-SHIRT",
      material: "275 GSM Jersey",
      size: "XL",
      color: "DUSTY ROSE",
      originalPrice: 48,
      salePrice: 36,
      quantity: 1,
      image: "/placeholder.svg?height=120&width=120",
    },
    {
      id: "2",
      name: "1011 HEAVYWEIGHT L/S T-SHIRT",
      material: "275 GSM Jersey",
      size: "XS",
      color: "DUSTY ROSE",
      originalPrice: 120,
      salePrice: 108,
      quantity: 3,
      image: "/placeholder.svg?height=120&width=120",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    setCartItems((items) => items.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id))
  }

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0)
  const totalPrice = cartItems.reduce((sum, item) => sum + item.salePrice * item.quantity, 0)

  return (
    <>
      {/* Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-4 right-4 z-40 bg-black text-white px-4 py-2 rounded-full flex items-center gap-2 hover:bg-gray-800 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6M7 13l-1.5-6M17 13v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2-2v6.01"
          />
        </svg>
        <span className="font-medium">CART ({totalItems})</span>
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
          <div className="bg-gray-50 w-full max-w-md h-full overflow-y-auto">
            {/* Header */}
            <div className="flex items-center justify-between p-4 bg-white border-b">
              <h2 className="text-sm font-medium tracking-wider">CART ({totalItems})</h2>
              <button onClick={() => setIsOpen(false)} className="p-1 hover:bg-gray-100 rounded">
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="p-4 space-y-6">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-20 h-24 bg-pink-100 rounded flex-shrink-0">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      width={80}
                      height={96}
                      className="w-full h-full object-cover rounded"
                    />
                  </div>

                  <div className="flex-1 space-y-1">
                    <h3 className="text-xs font-medium tracking-wide">{item.name}</h3>
                    <p className="text-xs text-gray-600">{item.material}</p>
                    <p className="text-xs text-gray-600">Size: {item.size}</p>
                    <p className="text-xs text-gray-600">Color: {item.color}</p>

                    <div className="flex items-center gap-2 pt-1">
                      <span className="text-xs text-gray-400 line-through">${item.originalPrice}</span>
                      <span className="text-sm font-medium">${item.salePrice}</span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border rounded">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-1 hover:bg-gray-100"
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="px-3 py-1 text-sm min-w-[40px] text-center">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-1 hover:bg-gray-100"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="text-xs text-gray-500 hover:text-gray-700 underline"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="mt-auto p-4 bg-white border-t space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Total</span>
                <span className="text-lg font-medium">${totalPrice}</span>
              </div>

              <div className="text-xs text-gray-600 space-y-1">
                <p>
                  Delivery <span className="text-blue-600 underline">Calculated at checkout</span>
                </p>
                <p>All sale items are final purchase</p>
              </div>

              <div className="flex items-start gap-2">
                <Checkbox
                  id="terms"
                  checked={acceptTerms}
                  onCheckedChange={(checked) => setAcceptTerms(checked as boolean)}
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

              {/* Payment Methods */}
              <div className="flex justify-center gap-2 pt-2">
                <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
                  <span className="text-white text-xs font-medium">Pay</span>
                </div>
                <div className="w-10 h-6 bg-black rounded flex items-center justify-center">
                  <div className="w-4 h-3 bg-white rounded-full"></div>
                </div>
                <div className="w-10 h-6 bg-blue-600 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">PayPal</span>
                </div>
                <div className="w-10 h-6 bg-blue-800 rounded flex items-center justify-center">
                  <span className="text-white text-xs font-bold">VISA</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
