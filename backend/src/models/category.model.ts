import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ICategory } from "../types/category.types.ts";
import Product from "../types/products.types.ts";


 const categorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, unique: true },
        products: { type: [Product], default: []},

    },
    {
        timestamps: true,
    }
);
export default mongoose.model<ICategory>("Category", categorySchema);


