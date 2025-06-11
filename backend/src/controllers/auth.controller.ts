import  jwt  from 'jsonwebtoken';
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import { User } from '../models/user.model.ts'
import { userProps } from '../types/types.ts'


export const login = async (req: Request, res: Response): Promise<any> => {
  const body:userProps = req.body
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
      expiresIn: "24h",
    }
  );
  res.status(200).json({ message: "Seja bem vindo Devolta", user,token})}



