import { Request, Response } from "express";  
import { categoriesProducts } from "../models/category.model.ts";

export const getCategory = (req: Request, res: Response) => {

    try {
        //Pegamos o nome da categoria que criamos na db locale padronizamos em minúscula
        const CategoryName = req.params.CategoryName.trim().toLocaleLowerCase;

        //uma pequena validação só para garantir que a categoria existe
        const categoryExistis = categoriesProducts.some(
            category => category.name.toLocaleLowerCase === CategoryName
        );
        
         //se a categoria não for encontrada retorna um status 404
        if(!categoryExistis){
            res.status(404).json({
                message: `Nenhma categoria '${CategoryName}' encontrada `,
                avalibleCategory: categoriesProducts.map(c => c.name) // aqui iremos listar as categorias só para ele ver
            })
        }

        //Vamos filtrar essa nossa categoria para que ele pegue exatamente a que queremos
        const filteredCategory = categoriesProducts.filter(
            categorys => categorys.name.toLocaleLowerCase === CategoryName
        )


        //caso encontre retorna um status 200
        res.status(200).json({
            data: filteredCategory
        })

        //Erros inesperados do servidor
    } catch (error) {
        res.status(500).json({
            message: "Erro ao buscar categoria"
        })
    }
}