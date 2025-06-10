import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getProductByCategory,
} from "../controllers/category.controller.ts"
const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.get("/",getAllCategories);
categoryRouter.get("/:id/products", getProductByCategory);

export default categoryRouter;

