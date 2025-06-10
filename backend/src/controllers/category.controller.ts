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