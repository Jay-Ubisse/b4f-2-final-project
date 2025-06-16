'use client'
import { useState, useEffect } from 'react'
import type { CheckoutFormValues } from './schemas'
import { Progress } from '../ui/progress'

type UserData = {
  name: string
  address: string
  postalCode: string
  shipping: string
  shippingPostalCode: string
}

type ProductItem = {
  id: string
  name: string
  quantity: number
  price: number
}

interface ConfirmationModalProps {
  isOpen: boolean
  onClose: () => void
  formData: CheckoutFormValues
}

export default function ConfirmationModal({ isOpen, onClose }: ConfirmationModalProps) {
  const [user, setUser] = useState<UserData | null>(null)
  const [items, setItems] = useState<ProductItem[]>([])

  useEffect(() => {
    const savedItems = JSON.parse(localStorage.getItem('itemProducts') || '[]')
    // Corrige os campos para o formato correto
    const itemsFixed = savedItems.map((item: any) => ({
      id: item._id,
      name: item.name,
      quantity: Number(item.quantity),
      price: Number(item.price),
    }))
    const storedData = localStorage.getItem('checkout-form')
    if (storedData) {
      const parsed = JSON.parse(storedData)
      const resumo: UserData = {
        name: `${parsed.firstName} ${parsed.lastName}`.trim(),
        address: parsed.address,
        postalCode: parsed.postalCode,
        shipping: parsed.city + ', ' + parsed.province,
        shippingPostalCode: parsed.postalCode
      }
      setUser(resumo)
    }
    setItems(itemsFixed)
  }, [])

  const now = new Date()
  const vencimento = new Date(now)
  vencimento.setDate(vencimento.getDate() + 7)

  const formatDate = (date: Date) => {
    const d = date.getDate().toString().padStart(2, '0')
    const m = (date.getMonth() + 1).toString().padStart(2, '0')
    const y = date.getFullYear()
    const h = date.getHours().toString().padStart(2, '0')
    return `${d}/${m}/${y}, ${h}:00`
  }

  const reciboDate = formatDate(now)
  const poDate = formatDate(vencimento)

  function getCartCalculations(items: ProductItem[]) {
    const subtotal = items.reduce((acc, item) => acc + item.quantity * item.price, 0)
    const iva = subtotal * 0.16
    const total = subtotal + iva
    const totalQuantity = items.reduce((acc, item) => acc + item.quantity, 0)
    return { subtotal, iva, total, totalQuantity }
  }

  const { subtotal, iva, total } = getCartCalculations(items)

  const handlePrint = () => {
    window.print()
    onClose()
  }

  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)

  const handleConfirm = () => {
    setLoading(true)
    setProgress(0)
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            onClose()
            localStorage.removeItem('checkout-form')
            localStorage.removeItem('itemProducts')
            window.location.href = '/orders/me'
          }, 300)
          return 100
        }
        return prev + 20
      })
    }, 300)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-xl font-bold text-gray-700 hover:text-red-600"
          aria-label="Fechar modal"
        >
          ×
        </button>

        <div className="p-6 text-sm text-zinc-800">
          <h1 className="text-3xl font-bold mb-4 text-primary">Receipt</h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            <div>
              <p className="font-bold text-gray-600">CHARGE A</p>
              <p>{user?.name || '---'}</p>
              <p>{user?.address || '---'}</p>
              <p>{user?.postalCode || '---'}</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">SEND TO</p>
              <p>{user?.name || '---'}</p>
              <p>{user?.shipping || '---'}</p>
              <p>{user?.shippingPostalCode || '---'}</p>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 text-xs">
            <div>
              <p className="font-bold text-gray-600">RECEIPT</p>
              <p>PT-001</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">DATE</p>
              <p>{reciboDate}</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">P.O.#</p>
              <p>1213/2019</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">DUE DATE</p>
              <p>{poDate}</p>
            </div>
          </div>

          <table className="w-full text-left text-sm mb-6 border border-primary/30">
            <thead>
              <tr className="bg-primary text-white uppercase text-xs">
                <th className="py-2 px-3 border border-primary/60">Qty</th>
                <th className="py-2 px-3 border border-primary/60">Description</th>
                <th className="py-2 px-3 border border-primary/60">Price</th>
                <th className="py-2 px-3 border border-primary/60">Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id ?? idx} className="border hover:bg-muted/20 transition">
                  <td className="py-2 px-3 border">{item.quantity}</td>
                  <td className="py-2 px-3 border">{item.name}</td>
                  <td className="py-2 px-3 border">{item.price.toFixed(2)}</td>
                  <td className="py-2 px-3 border">{(item.quantity * item.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr className="font-semibold text-gray-900">
                <td colSpan={3} className="text-right py-3 pr-4 border">Subtotal</td>
                <td className="py-3 px-3 border">{subtotal.toFixed(2)}</td>
              </tr>
              <tr className="font-semibold text-gray-900">
                <td colSpan={3} className="text-right py-3 pr-4 border">IVA 16%</td>
                <td className="py-3 px-3 border">{iva.toFixed(2)}</td>
              </tr>
              <tr className="font-bold text-xl text-primary">
                <td colSpan={3} className="text-right py-4 pr-4 border">TOTAL</td>
                <td className="py-4 px-3 border">{total.toFixed(2)} MTN</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-6 text-2xl font-bold italic text-center text-primary">
            Thank you for your purchase!
          </p>
          <p className="text-center font-semibold italic text-gray-700 tracking-widest">
            B4F E-COMMERCE
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-3">
            <button
              onClick={handleConfirm}
              disabled={loading}
              className={`w-full bg-primary text-white px-4 py-2 rounded hover:bg-primary/80 transition ${
                loading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="flex flex-col items-center">
                  <p className="text-sm">Processando...</p>
                  <Progress value={progress} className="h-1 mt-2" />
                </div>
              ) : (
                'Confirm Order'
              )}
            </button>

            <button
              onClick={handlePrint}
              className="w-full border border-primary text-primary px-4 py-2 rounded hover:bg-primary/10 transition"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}