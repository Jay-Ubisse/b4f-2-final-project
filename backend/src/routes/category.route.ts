import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getProductByCategory,
  getAllCategories,
} from "../controllers/category.controller.ts"
const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.get("/:id", getProductByCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.get("/",getAllCategories);

export default categoryRouter;

