import mongoose, { Schema } from "mongoose";
import { CategoryProps } from "../types/category.types.ts";


const categorySchecma = new Schema<CategoryProps>({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
});

const Category =  mongoose.models.Category || mongoose.model<CategoryProps>("Category", categorySchecma);


export default Category;

