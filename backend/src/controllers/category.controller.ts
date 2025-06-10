import { Request, Response } from "express";
import { CategoryProps } from "../types/category.ts";
import { categoriesProducts } from "../models/category.model.ts";

export const listCategory = (req: Request, res: Response) => {
  try {
    const categoryName = req.params.categoryName.trim().toLowerCase();

    const categoryExists = categoriesProducts.some(
      (category: CategoryProps) => category.name.toLowerCase() === categoryName
    );

    if (!categoryExists) {
       res.status(404).json({
        message: `Nenhuma categoria '${categoryName}' encontrada`,
        availableCategories: categoriesProducts.map((c) => c.name),
      });
    }

    const filteredCategory = categoriesProducts.find(
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
};