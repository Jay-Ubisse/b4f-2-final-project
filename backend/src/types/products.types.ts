import { CategoryProps } from './category.types.ts';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

interface ProductProps{
    name:string;
    price:number;
    category:CategoryProps;
}

export default ProductProps;