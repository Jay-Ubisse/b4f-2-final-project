import { ICategory } from './category.types.ts';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

interface IProduct{
    name:string;
    price:number;
    category:ICategory;
}

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
});
export default  mongoose.model<IProduct>("Product", productSchema);