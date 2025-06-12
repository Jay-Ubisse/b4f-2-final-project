
import { useState } from "react";
import type { ProductProps } from "../types/cart";
/*import { cartProps } from "../types/cart";

export const addToCart = () => {
     const [products, setProducts] = useState<ProductProps[]>([]);
     const [cart, setCart] = useLocalStorageState<CartProps>('cart', {})

    const addToCart = (product: ProductProps): void => {
        product.quantity = 1

        setCart((prevetCart) => ({
            ...prevetCart,
            [product.id]: product,
        }));
    }

    return (
        <>
         <div> 

            
            
          </div>  
        </>
    )
};
*/

export const deleteProduct = () =>{
    const [productId, setProductId] = useState("productId");

    return (
        <>
        <div>

        </div>
        </>
    )
}

