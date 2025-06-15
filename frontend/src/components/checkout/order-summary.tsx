import React from 'react';

interface OrderItem {
  name: string;
  price: number;
  quantity: number;
}

interface OrderSummaryProps {
  items: OrderItem[];
  total: number;
  onConfirm: () => void;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ items, total}) => {
  return (
    <div className="order-summary-card font-mono ">
      <h2 className='font-extrabold '>Order Summary</h2>
      <ul>
        {items.map((item, index) => (
          <li key={index}>
            {item.name} -  {item.price}MZM x {item.quantity} = {item.price * item.quantity} MZM
          </li>
        ))}
      </ul>
      <p className='font-semibold'>Total: {total} MZM</p>
{    /*  <button onClick={onConfirm}>Confirm Order</button>
*/}    </div>
  );
};

export default OrderSummary;