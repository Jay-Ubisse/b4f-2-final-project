'use client';
import { useState, useEffect } from 'react';
import type { CheckoutFormValues } from './schemas';

type UserData = {
  name: string;
  address: string;
  postalCode: string;
  shipping: string;
  shippingPostalCode: string;
};

type ProductItem = {
  id: string;
  name: string;
  qty: number;
  price: number;
};

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  formData: CheckoutFormValues;
}

export default function ConfirmationModal({ isOpen, onClose, formData }: ConfirmationModalProps) {
  const [user, setUser] = useState<UserData | null>(null);  
  const [items, setItems] = useState<ProductItem[]>([]);

  useEffect(() => {
    const storedUser = localStorage.getItem("userData");
    const savedItems = JSON.parse(localStorage.getItem("itemProducts") || "[]");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (savedItems) setItems(savedItems);
  }, []);

  const formatDate = (date: Date) =>
    date.toLocaleDateString('pt-PT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    });

  const now = new Date();
  const reciboDate = formatDate(now);
  const poDate = formatDate(now);

  const subtotal = items.reduce((acc, item) => acc + item.qty * item.price, 0);
  const iva = subtotal * 0.16;
  const total = subtotal + iva;

  const handlePrint = () => {
    window.print();
    onClose();
  };

  const handleConfirm = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-3xl relative overflow-y-auto max-h-[90vh]">
        {/* Botão para fechar o modal */}
        <button
          onClick={onClose}
          className="absolute top-2 right-4 text-xl font-bold text-black hover:text-gray-600"
          aria-label="Fechar modal"
        >
          ×
        </button>

        {/* Conteúdo do recibo */}
        <div className="p-6 text-sm text-black">
          <h1 className="text-3xl font-bold mb-4 text-gray-600">RECIBO</h1>

          {/* Informações do cliente */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6 text-xs">
            <div>B4F ECOMMERCE</div>
            <div>
              <p className="font-bold text-gray-600">COBRAR A</p>
              <p>{user?.name || '---'}</p>
              <p>{user?.address || '---'}</p>
              <p>{user?.postalCode || '---'}</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">ENVIAR PARA</p>
              <p>{user?.name || '---'}</p>
              <p>{user?.shipping || '---'}</p>
              <p>{user?.shippingPostalCode || '---'}</p>
            </div>
          </div>

          {/* Informações do recibo */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 text-xs">
            <div>
              <p className="font-bold text-gray-600">RECIBO #</p>
              <p>PT-001</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">DATA DO RECIBO</p>
              <p>{reciboDate}</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">P.O.#</p>
              <p>1213/2019</p>
            </div>
            <div>
              <p className="font-bold text-gray-600">DATA DE VENCIMENTO</p>
              <p>{poDate}</p>
            </div>
          </div>

          {/* Tabela de produtos */}
          <table className="w-full text-left text-sm mb-6">
            <thead>
              <tr className="border-b-2 border-black uppercase text-xs text-black">
                <th className="py-2">Qty</th>
                <th>Description</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item, idx) => (
                <tr key={item.id ?? idx} className="border-b text-sm">
                  <td className="py-1">{item.qty}</td>
                  <td>{item.name}</td>
                  <td>{item.price.toFixed(2)}</td>
                  <td>{(item.qty * item.price).toFixed(2)}</td>
                </tr>
              ))}
              <tr>
                <td colSpan={3} className="text-right font-semibold pt-4">Subtotal</td>
                <td className="pt-4">{subtotal.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={3} className="text-right font-semibold"> IVA 16%</td>
                <td>{iva.toFixed(2)}</td>
              </tr>
              <tr>
                <td colSpan={3} className="text-right text-xl font-bold pt-2">TOTAL</td>
                <td className="text-xl font-bold text-gray-600">{total.toFixed(2)} MTN</td>
              </tr>
            </tbody>
          </table>

          <p className="mt-6 text-2xl font-bold italic" style={{ color: '#8B4513' }}>
            Thank you for your purchase!
          </p>

          {/* Ações */}
          <div className="flex justify-end gap-4 mt-6">
            <button
              onClick={handleConfirm}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-[#6B3310]"
            >
              Confirm Order
            </button>
            <button
              onClick={handlePrint}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-[#6B3310]"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
