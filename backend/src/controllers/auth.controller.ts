import  jwt  from 'jsonwebtoken';
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user.model.ts'
import { userProps } from '../types/types.ts'


export const login = async (req: Request, res: Response) => {
  const body = req.body
  const { email, password } = body

  const user = await User.findOne({ email })

  if (!user) {
    return res
      .status(401)
      .json({ message: 'Email ou palavra-passe incorreto.' })
  }

  const isEqual = await bcrypt.compare(password, user.password);
  if (!user || !isEqual) {
   return res.status(401).json({ message: "Email ou palavra-passe incorreto." });
  }

const jwtSecret: string = process.env.JWT_SECRET || '';
  const token = jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
    },
   jwtSecret,
    {
      expiresIn: "1h",
    }
  );
  res.status(200).json({ message: "Seja bem vindo Devolta", user,token})}




export const register = async (req: Request, res: Response) => {
  try {
    const body: userProps = req.body
    const { name, email, password } = body

    User.create({name, email, password})
    /*.then((User) => {*/
    res.status(201).json({ message: 'Registrado com sucesso', body })
  } catch (error) {
    res.status(500).json({ message: 'Ocorreu um erro', error })
  }
}
