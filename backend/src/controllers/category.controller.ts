/*import { Request, Response } from "express";
import { CategoryProps } from "../types/category.ts";
import { Category } from "../models/category.model.ts";

export const listCategory = (req: Request, res: Response) => {
  try {
    const categoryName = req.params.categoryName.trim().toLowerCase();

    const categoryExists = Category.some(
      (category: CategoryProps) => category.name.toLowerCase() === categoryName
    );

    if (!categoryExists) {
       res.status(404).json({
        message: `Nenhuma categoria '${categoryName}' encontrada`,
        availableCategories: Category.map((c) => c.name),
      });
    }

    const filteredCategory = Category.find(
      (category: CategoryProps) => category.name.toLowerCase() === categoryName
    );

    res.status(200).json({
      category: filteredCategory?.name,
      count: filteredCategory?.products.length,
      products: filteredCategory?.products,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao buscar categoria",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};*/

import { Request, Response } from "express";
import { Category } from "../models/category.model.ts"; 
import { Product } from "../models/products.model.ts";   

export const getProductsByQueryCategory = async (req: Request, res: Response) => {
  try {
    const categoryName = req.query.category;

    if (!categoryName || typeof categoryName !== "string") {
        res.status(400).json({
        message: "Parâmetro 'category' obrigatório e deve ser string"
      });return
    }
    
    const normalizedCategory = categoryName.trim().toLowerCase();

    const foundCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${normalizedCategory}$`, "i") }
    });

    if (!foundCategory) {
      const allCategories = await Category.find();
       res.status(404).json({
        message: `Categoria "${normalizedCategory}" não encontrada.`,
        availableCategories: allCategories.map(cat => cat.name)
      });
    }

    const products = await Product.find({ category: foundCategory?._id });

     res.status(200).json({
      category: foundCategory?.name,
      totalProducts: products.length,
      products
    });

  } catch (error) {
    console.error("❌ Erro ao buscar produtos por categoria:", error);
     res.status(500).json({
      message: "Erro interno no servidor",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};