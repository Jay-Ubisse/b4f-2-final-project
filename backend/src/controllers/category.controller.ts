import categoryModel from "../models/category.model.ts";import  Category  from "../models/category.model.ts";
import Product from "../types/products.types.ts";
import { Request, Response } from "express";

export const createCategory = async (req: Request, res: Response) => {
    try {
        const { name, products } = req.body;
        
        const existingCategory = await Category.findOne({name});
         if (existingCategory){
            res.status(400).json({message:"Category exists"});
            return;
         }

    const newCategory = new Category({name, products});
    await newCategory.save();
    res.status(201).json({message:"Created successfully", category:newCategory});
      return  
    } catch (error) {
        console.log("error creating category:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
        return;
    }
};

export const getAllCategories = async (req: Request, res: Response) => {
    try {
        const categories =await Category.find();

        res.status(200).json({message:"OK",categories});
        if(categories.length === 0){
            console.log("Nao foram encontradas categorias");
             return res.status(404).json({message:"No Categories Found"});
                
            }else{
                return res.status(200).json({message:"OK",categories});    
            }
      } catch (error) {
        res.status(500).json({ message: "Internal Server Error, Try Again" });
        
    }

};


export const getProductByCategory = async (req: Request, res: Response):Promise<void> => {
   
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


export const updateCategory = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { name, products } = req.body;

        const existingCategory = await Category.findById(id);

        if (!existingCategory) {
            console.log("Categoria não encontrada");
            return res.status(404).json({ message: "Category Not Found" });
        }

        existingCategory.name = name || existingCategory.name;
        existingCategory.products = products || existingCategory.products;

        await existingCategory.save();
        res.status(200).json({ message: "Category Updated Successfully", category: existingCategory });
        
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error, Try Again" });
        
    }
};


export const deleteCategory = async (req: Request, res: Response)  => {
    try {
        const { id } = req.params;

        const existingCategory = await Category.findById(id);

        if (!existingCategory) {
            console.log("Categoria não encontrada");
            return res.status(404).json({ message: "Category Not Found" });
        }
        await categoryModel.deleteOne({ id });
        res.status(200).json({ message: "Category Deleted Successfully" });
        
    } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        res.status(500).json({ message: "Internal Server Error, Try Again" });
        
    }
};
