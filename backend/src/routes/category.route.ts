import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getProductByCategory,
} from "../controllers/category.controller.ts"
import { authentionToken } from "../middleware/auth.middleware.ts";
import { authorizeRole } from "../controllers/category.controller.ts";
const categoryRouter = express.Router();

categoryRouter.post("/", authorizeRole("admin"), createCategory);
categoryRouter.put("/:id", authorizeRole("admin"),updateCategory);
categoryRouter.delete("/:id",authorizeRole("admin") ,deleteCategory);
categoryRouter.get("/",getAllCategories);
categoryRouter.get("/:id/products", getProductByCategory);


export default categoryRouter;

