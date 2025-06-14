import Products from "../models/products.model.ts";
import Category from "../models/products.model.ts";
import { ProductsProps } from "../types/products.types.ts";
import { Response, Request, NextFunction } from "express";

export const authorizeRole = async (role: string) => {
  (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || user.role !== role) {
      res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};
export const createProduct = async (req: Request, res: Response) => {
    authorizeRole("admin");
  try {
    const body: ProductsProps = req.body;
    const {
      name,
      price,
      imageUrl,
      category,
      description,
      colors,
      sizes,
      stock,
      categoryId,
    } = body;
    const categoryData = await Category.findById(categoryId).populate("Categories");
    const product = Products.create({
      name,
      price,
      imageUrl,
      category: categoryData,
      description,
      colors: colors ||[],
      sizes: sizes || [],
      stock,
    });
    res.status(201).json({ message: "Product created successfully", product });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred",error});
  }
};

export const getProductId = async (req: Request, res: Response) => {
  try {
    const productId = req.params.id;
    const existingProduct = await Products.findById(productId).select({});
    if (!existingProduct) {
      res.status(404).json({ message: "Product not found" });
    }
    res
      .status(200)
      .json({ message: "Ok", existingProduct });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred" });
  }
};

export const deletedProduct = (req: Request, res: Response) => {
  authorizeRole("admin");
  const { id } = req.params;
  Products.findByIdAndDelete(id)
    .then((deletedProduct) => {
      if (!deletedProduct) {
        res.status(404).json({ message: "Product not found" });
      }
      res.status(200).json({ message: "Ok" });
    })
    .catch((error) => {
      res
        .status(500)
        .json({ message: "An internal server error occurred", error });
    });
};

export const updateProduct = async (req: Request, res: Response) => {
  authorizeRole;
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
    const categoryData = await Category.findById(categoryId).populate(
      "Category"
    );
    const product = await Products.findByIdAndUpdate(id, {
      name,
      price,
      category: categoryData,
      imageUrl,
      description,
      colors: colors,
      sizes: sizes || [],
      stock,
      categoryId,
    });
    if (!product) {
      res.status(404).json({ message: "product not found" });
    }

    res.status(200).json({ message: "product updated successfully", product });
  } catch (error) {
    res.status(500).json({ message: "An internal server error occurred", error });
  }
};

export const getProducts = async (req: Request, res: Response) => {
   try {
      const products = await Products.find().populate("category");

      res.status(200).json({
         message: "ok", 
         deta: products
      })
   } catch (error) {
      res.status(500).json({
         message: "An internal server error occurred"
      })
   }

  try {
    const { page = "1", perPage = "4" } = req.query;

    const currentPage = parseInt(page as string, 10);
    const itemsPerPage = parseInt(perPage as string, 10);
    const skip = (currentPage - 1) * itemsPerPage;

    const totalItems = await Products.countDocuments();
    const products = await Products.find()
      .populate("category")
      .skip(skip)
      .limit(itemsPerPage);

    res.status(200).json({
      message: products.length > 0 ? "Ok" : "No products available.",
      data: products,
      totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      currentPage,
      perPage: itemsPerPage,
    });
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
    res.status(500).json({ message: "An internal server error occurred" });
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
      filter.category = categoryId;
      const categoryExists = await Category.findById(categoryId);
      if (!categoryExists) {
        const allCategories = await Category.find();
         res.status(404).json({
          message: "Not found",
          availableCategories: allCategories.map(cat => cat.name),
        });
      }
    }

    if (!search && !categoryId) {
       res.status(400).json({
        message: "search parameter is required",
      });
    }

    const totalItems = await Products.countDocuments(filter);
    const products = await Products.find(filter)
      .populate("category")
      .skip(skip)
      .limit(itemsPerPage);

    const response: any = {
      data: products,
      totalItems,
      totalPages: Math.ceil(totalItems / itemsPerPage),
      currentPage,
      perPage: itemsPerPage,
    };

    if (products.length === 0) {
      response.message = "Not found";
    }

     res.json(response);
  } catch (error) {
    console.error("Erro ao buscar produtos:", error);
     res.status(500).json({ message: "An internal server error occurred" });
  }
};


export const getProductsByQueryCategory = async (req: Request, res: Response) => {
  try {
    const categoryName = req.query.category;

    if (!categoryName || typeof categoryName !== "string") {
        res.status(400).json({
        message: "category Parameter is required"
      });return
    }
    
    const normalizedCategory = categoryName.trim().toLowerCase();

    const foundCategory = await Category.findOne({
      name: { $regex: new RegExp(`^${normalizedCategory}$`, "i") }
    });

    if (!foundCategory) {
      const allCategories = await Category.find();
       res.status(404).json({
        message: "Not found",
        availableCategories: allCategories.map(cat => cat.name)
      });
    }

    const products = await Products.find({ category: foundCategory?._id });

     res.status(200).json({
      category: foundCategory?.name,
      totalProducts: products.length,
      products
    });

  } catch (error) {
    console.error("Erro ao buscar produtos por categoria:", error);
     res.status(500).json({
      message: "An internal server error occurred",
      error: error instanceof Error ? error.message : "Unknown error"
    });
  }
};
