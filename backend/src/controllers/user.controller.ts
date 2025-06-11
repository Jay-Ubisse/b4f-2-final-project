import { Request, Response,NextFunction } from 'express'
import { User } from '../models/user.model.ts'



export function getDetails(req: Request, res: Response) {
  try{
     const dados = User.findOne({user: req.params.id}).populate('user',["name", "email", "token"])
 if (!dados) {
    res.status(404).json({ message: 'Erro, Dados não encontrados' })
    }

    res.status(200).json({ message: 'Dados encontrados com sucesso', dados }) 
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao buscar os dados do usuário' })
  }
}