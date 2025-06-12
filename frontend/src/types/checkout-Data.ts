import type { CartItemProps } from "./cart-Item";

export interface CheckoutDataProps {
    name: string;
    address: string;
    cartItems:CartItemProps[];
}