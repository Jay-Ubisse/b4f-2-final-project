import mongoose, { Schema } from 'mongoose';
import ProductProps  from '../types/products.types.ts';


const productSchema = new Schema<ProductProps>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true }, 
});
export default  mongoose.model<ProductProps>("Product", productSchema);