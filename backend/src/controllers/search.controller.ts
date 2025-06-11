import { getProductsByQueryCategory } from './category.controller.ts';
import { Request, Response } from "express";
import { Product } from "../models/products.model.ts";

export const getProductsBySearch = async (req: Request, res: Response) => {
  try {
    const { search, categoryId, page = "1", perPage = "10" } = req.query;

    const currentPage = parseInt(page as string, 10);
    const itemsPerPage = parseInt(perPage as string, 10);
    const skip = (currentPage - 1) * itemsPerPage;

    const filter: any = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" }; // busca por nome
    }

    if (categoryId) {
      filter.categoryId = categoryId;
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
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ message: "Erro ao buscar produtos." });
  }
};
