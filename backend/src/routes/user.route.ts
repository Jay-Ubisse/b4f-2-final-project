import { Router } from 'express';
import {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategories,
  getProductByCategory,
} from '../controllers/category.controller.ts';

export const router = Router();

router.post('/categories', createCategory);
router.put('/categories/:id', updateCategory);
router.delete('/categories/:id', deleteCategory); 
router.get('/categories', getAllCategories);
router.get('/categories/:id/products', getProductByCategory);


