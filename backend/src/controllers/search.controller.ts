
import { Request, Response } from "express";
import { products} from "../models/products.model.ts";
import { ProductsProps } from "../types/products.ts";

// Função para buscar produtos com filtros e paginação
export const searchProducts = (req: Request, res: Response) => {
  const {
    query,
    page = "1",
    perPage = "10",
  } = req.query;


  // Filtro base
  let filteredProducts = products;

  // Filtro por nome (query)
  if (query) {
    filteredProducts = filteredProducts.filter((product) =>
      product.name.toLowerCase().includes((query as string).toLowerCase())
    );
  }

  // Paginação
  const totalItems = filteredProducts.length;
  const currentPage = parseInt(page as string);
  const itemsPerPage = parseInt(perPage as string);
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

    res.json({
    data: paginatedProducts,
    totalItems,
    totalPages,
    currentPage,
    perPage: itemsPerPage,
  });
};
