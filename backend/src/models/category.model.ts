import mongoose, { Schema } from "mongoose";
import { CategoryProps } from "../types/category.types.ts";

 const categorySchema = new Schema<CategoryProps>(
    {
        name: { type: String, required: true, unique: true },
        description:{ type: String, default:""}

    },{
        timestamps: true
    }
);

export default mongoose.model<CategoryProps>("Category", categorySchema);


