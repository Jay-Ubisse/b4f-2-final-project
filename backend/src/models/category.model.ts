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



import { CategoryProps} from "../types/user.js";

const categorySchecma = new Schema<CategoryProps>({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
});

export const Category = mongoose.model<CategoryProps>(
  "Category",
  categorySchecma
);

