
export interface OrderProps {
    orderId: string;
    customerName: string;
    items: Array<{
        itemId: string;
        quantity: number;
        price: number;
    }>;
    totalAmount: number;
    orderDate: string;
    status: 'pending' | 'shipped' | 'delivered' | 'cancelled';
    shippingAddress: {
       country: string;
       city: string;
    };
}