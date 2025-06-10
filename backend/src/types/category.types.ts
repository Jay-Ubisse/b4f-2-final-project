import type Product  from './products.types.ts';

 export interface CategoryProps {
    name: string;
    products: Product[];
    createdAt?: Date;
    updatedAt?: Date;
}

