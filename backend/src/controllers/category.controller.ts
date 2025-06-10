import categoryCollection from "../models/category.model.ts";
import  Category  from "../models/category.model.ts";
import Product from "../models/product.model.ts";
import { NextFunction, Request, Response} from "express";

export const createCategory = async (req: Request, res: Response) => {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, Try Again" });
        
    }
};

export const getAllCategories = async (req: Request, res: Response,  next:NextFunction)=> {

     try {
        const { page, limit } = req.query;

        if (page && limit) {
            const pageNumber = Number(page);
            const limitNumber = Number(limit);
            const paginatedCategory = await categoryCollection.paginate({}, {
                page: pageNumber,
                limit: limitNumber
            });
            return res.status(200).json({ paginatedCategory });
        }

        const categories = await Category.find();
        if (categories.length === 0) {
            console.log("Nao foram encontradas categorias");
            return res.status(404).json({ message: "No Categories Found" });
        }
         res.status(200).json({ message: "OK", categories });
         return;
    } catch (error) {
        next(error);
    }
};


export const getProductByCategory = async (req: Request, res: Response)=> {
   
    try {
        const {id}= req.params;
        const existingCategory=await Category.findById(id);
        if(!existingCategory){
            res.status(404).json({message:"Category Not Found"});
            return;
        }else{
            const products = await Product.find({category:id});
            if(products.length === 0){
                console.log("Nao foram encontrados produtos nesta categoria");
                res.status(404).json({message:"No Products Found in this Category"});
                return;
            }else{
                res.status(200).json(products);
                return;
            }
        }

        
    } catch (error) {
        console.error("Erro ao buscar produtos por categoria:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
        
    }
};


export const updateCategory = async (req: Request, res: Response)=> {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, Try Again" });
        
    }
};


export const deleteCategory = async (req: Request, res: Response)=> {
    try {
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, Try Again" });
        
    }
};
