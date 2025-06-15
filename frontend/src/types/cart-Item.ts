export interface CartItemProps {
    id: string;
    name: string;
    quantity: number;
    price: number;
    totalPrice: number;
    imageUrl?: string; 
    description?: string; 
    category?: string; 
    image?: string; 
}