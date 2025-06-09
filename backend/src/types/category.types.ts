import { IProduct } from './products.types.ts';

interface ICategory {
    name: string;
    products:IProduct[];
    createdAt?: Date;
    updatedAt?: Date;
}

export { ICategory };