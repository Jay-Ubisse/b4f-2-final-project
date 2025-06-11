import { Request, Response } from "express";
import { Product } from "../models/products.model.ts";
import { Category } from "../models/category.model.ts"; // Importe o modelo de categoria

export const getProductsBySearch = async (req: Request, res: Response) => {
  try {
    const { search, categoryId, page = "1", perPage = "10" } = req.query;

    const currentPage = parseInt(page as string, 10);
    const itemsPerPage = parseInt(perPage as string, 10);
    const skip = (currentPage - 1) * itemsPerPage;

    const filter: any = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (categoryId) {
      filter.categoryId = categoryId;
      // Verifica se a categoria existe
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        const allCategories = await Category.find();
         res.status(404).json({
          message: `Categoria não encontrada.`,
          availableCategories: allCategories.map(cat => cat.name)
        });
      }
    }

    if (!search && !categoryId) {
       res.status(400).json({
        message: "Parâmetro 'search' é obrigatório.",
      });
    }

    const totalItems = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .populate("category")
      .skip(skip)
      .limit(itemsPerPage);

    res.json({
      data: products,
      totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      currentPage,
      perPage: itemsPerPage,
       message: products.length === 0 ? "Nenhum produto encontrado." : undefined
    });
    
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ message: "Erro ao buscar produtos." });
  }
};