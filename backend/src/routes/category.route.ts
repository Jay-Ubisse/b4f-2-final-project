import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getProductByCategory,
} from "../controllers/category.controller.ts"
import { authentionToken, authorizeRole } from "../middleware/auth.middleware.ts";
const categoryRouter = express.Router();

categoryRouter.post("/", authentionToken,authorizeRole("admin"), createCategory);
categoryRouter.put("/:id", authentionToken,authorizeRole("admin"),updateCategory);
categoryRouter.delete("/:id",authentionToken,authorizeRole("admin") ,deleteCategory);
categoryRouter.get("/",getAllCategories);
categoryRouter.get("/:id/products", getProductByCategory);


// categoryRouter.post("/",  createCategory);
// categoryRouter.put("/:id", updateCategory);
// categoryRouter.delete("/:id",  deleteCategory);



export default categoryRouter;

