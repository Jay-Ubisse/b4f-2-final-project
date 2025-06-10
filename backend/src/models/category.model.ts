import mongoose from "mongoose";
import { Schema } from "mongoose";
import { ICategory } from "../types/category.types.ts";


 const categorySchema = new Schema<ICategory>(
    {
        name: { type: String, required: true, unique: true },
        products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    },
    {
        timestamps: true,
    }
);
export default mongoose.model<ICategory>("Category", categorySchema);


