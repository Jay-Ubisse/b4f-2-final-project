import mongoose, { Schema } from 'mongoose';
import { IProduct } from '../types/products.types.ts';

const productSchema = new Schema<IProduct>({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: 'Category', required: true },
});

export default mongoose.model<IProduct>('Product', productSchema);