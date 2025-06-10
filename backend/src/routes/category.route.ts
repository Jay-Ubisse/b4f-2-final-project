import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getProductByCategory,
} from "../controllers/category.controller.ts";

const categoryRouter = express.Router();

categoryRouter.post("/", createCategory);
categoryRouter.put("/:id", updateCategory);
categoryRouter.delete("/:id", deleteCategory);
categoryRouter.get("/:id/products", getProductByCategory);

export default categoryRouter;

