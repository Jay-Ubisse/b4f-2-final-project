import { Request, Response } from "express";  
import { categoriesProducts } from "../models/category.model.js";

export const listCategory = (req: Request, res: Response) => {
    try {
    
        const categoryName = req.params.CategoryName.trim().toLocaleLowerCase();

   
        const categoryExists = categoriesProducts.some(
            category => category.name.toLocaleLowerCase() === categoryName
        );
        
        if (!categoryExists) {
       
             res.status(404).json({
                message: `Nenhuma categoria '${categoryName}' encontrada`,
                availableCategories: categoriesProducts.map(c => c.name)
            });
        }

      
        const filteredProducts = categoriesProducts.filter(
            category => category.name.toLocaleLowerCase() === categoryName
        )[0]?.products || []; // Assumindo que cada categoria tem um array 'products'

        
        res.status(200).json({
            category: categoryName,
            count: filteredProducts.length,
            products: filteredProducts // Renomeado para ficar claro
        });

    } catch (error) {
    
        res.status(500).json({
            message: "Erro ao buscar categoria",
            
        });
    }
};