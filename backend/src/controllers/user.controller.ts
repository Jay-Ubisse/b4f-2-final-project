import { Request, Response,NextFunction } from 'express'
import { User } from '../models/user.model.ts'


export async function getDetails(req: Request, res: Response) {
  try {
    const details = await User.find()

   if (!details) {
    res.status(404).json({ message: 'Erro, Dados não encontrados' })
    }

    res.status(200).json({ message: 'Dados encontrados com sucesso', details })
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao buscar os dados do usuário' })
  }
}
