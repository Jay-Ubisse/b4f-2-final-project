import mongoose, { Schema } from "mongoose";
import { CategoryProps } from "../types/category.ts";


const categorySchecma = new Schema<CategoryProps>({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
});

export const Category = mongoose.model<CategoryProps>(
  "Category",
  categorySchecma
);

