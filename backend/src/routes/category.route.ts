import express from "express";
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getProductByCategory,
} from "../controllers/category.controller.ts"


import { authentionToken } from "../middleware/auth.Middleware.ts";
import { authorizeRole } from "../controllers/category.controller.ts";
const categoryRouter = express.Router();

categoryRouter.post("/", authentionToken, authorizeRole("admin"), createCategory);
categoryRouter.put("/:id", authentionToken, authorizeRole("admin"),updateCategory);
categoryRouter.delete("/:id",authentionToken, authorizeRole("admin") ,deleteCategory);
categoryRouter.get("/",getAllCategories);
categoryRouter.get("/:id/products", getProductByCategory);
<<<<<<< HEAD

=======
>>>>>>> cdcce75dac082793947457b859e3e5d1b92c7223








export default categoryRouter;
