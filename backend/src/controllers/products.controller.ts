import { Product } from "../models/products.model.ts";
import { Category } from "../models/category.model.ts";
import { ProductsProps } from "../types/products.ts";
import { Response, Request, NextFunction } from "express";


export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;
    if (!user || user.role !== role) {
      return res.status(403).json({ message: "Access denied" });
    }
    next();
  };
};

export const createProduct = async (req: Request, res: Response) => {
  try {
    const body: ProductsProps = req.body;
    const {
      name,
      price,
      imageUrl,
      categoryId,
      description,
      colors,
      sizes,
      stock,
    } = body;

    const categoryData = await Category.findById(categoryId);
    if (!categoryData) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    const product = await Product.create({
      name,
      price,
      imageUrl,
      category: categoryData._id,
      description,
      colors: colors || [],
      sizes: sizes || [],
      stock,
    });

    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred", error });
  }
};

export const getProductId = async (req: Request, res: Response): Promise<void> => {
  try {
    const productId = req.params.id;
    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      res.status(404).json({ message: "Producto nao encontrado" });
      return; 
    }
    res.status(200).json({ message: "Ok", existingProduct });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred", error });
  }
};

export const deletedProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Produto removido com sucesso" });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred", error });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const body: ProductsProps = req.body;
    const {
      name,
      price,
      imageUrl,
      description,
      colors,
      sizes,
      stock,
      categoryId,
    } = body;

    const categoryData = await Category.findById(categoryId);
    if (!categoryData) {
      return res.status(404).json({ message: "Categoria não encontrada" });
    }

    const product = await Product.findByIdAndUpdate(
      id,
      {
        name,
        price,
        imageUrl,
        description,
        colors: colors || [],
        sizes: sizes || [],
        stock,
        category: categoryData._id,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred", error });
  }
};

export const getProducts = async (_req: Request, res: Response) => {
  try {
    const products = await Product.find();
    res.status(200).json({ message: "Ok", data: products });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred", error });
  }
};

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
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        const allCategories = await Category.find();
        return res.status(404).json({
          message: "Categoria não encontrada",
          availableCategories: allCategories.map(cat => cat.name),
        });
      }
      filter.category = categoryId;
    }

    if (!search && !categoryId) {
      return res.status(400).json({ message: "Parâmetro 'search' ou 'categoryId' é necessário" });
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
      message: products.length === 0 ? "Not found" : undefined,
    });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred", error });
  }
};

export const getProductsByQueryCategory = async (req: Request, res: Response) => {
  try {
    const categoryName = req.query.category;

    if (!categoryName || typeof categoryName !== "string") {
      return res.status(400).json({ message: "Parâmetro 'category' é necessário" });
    }

    const normalizedCategory = categoryName.trim().toLowerCase();

    const foundCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${normalizedCategory}$`, "i") },
    });

    if (!foundCategory) {
      const allCategories = await Category.find();
      return res.status(404).json({
        message: "Categoria não encontrada",
        availableCategories: allCategories.map(cat => cat.name),
      });
    }

    const products = await Product.find({ category: foundCategory._id });

    res.status(200).json({
      category: foundCategory.name,
      totalProducts: products.length,
      products,
    });
  } catch (error) {
    res.status(500).json({
      message: "An internal server error occurred",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
