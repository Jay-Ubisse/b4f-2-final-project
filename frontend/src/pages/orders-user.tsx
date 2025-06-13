//import OrderItem from "@/components/orderItem";
import React, { useState, useEffect } from 'react'
import type { OrderProps } from '../types/order';



export const OrdersUser: React.FC = () => {
  const [order, setOrders] = useState<OrderProps[]>([]);
 

  useEffect(() => {
    const ordersSaves = localStorage.getItem('orders');
    if (ordersSaves) {
      setOrders(JSON.parse(ordersSaves));
    } else {
      setOrders([]);
    }
  }, []);


  



  return (
    <div className='p-6'>
      <h2 className='font-bold text-blue-600 justify-center'>User Orders</h2>
        <div className="flex flex-wrap items-center gap-2 md:flex-row">
    </div>
      <ul>
        {order.map((order) => (
          <li key={order.orderId}>
            {order. customerName} - Quantity: {order. status}
          </li>
        ))}
      </ul>
    
    </div>
  );
};


