import mongoose, { Schema } from "mongoose";
import { CategoryProps } from "../types/category.ts";


const categorySchecma = new Schema<CategoryProps>({
  name: { type: String, required: true, unique: true },
  description: { type: String, default: "" },
});

export const Category = mongoose.model<CategoryProps>("Category", categorySchecma);



<<<<<<< HEAD
export default Category;
=======

>>>>>>> b0bc113ba43df0ee0e742125a7f3f6424ce8a73e
