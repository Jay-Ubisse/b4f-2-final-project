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




export const register = async (req:Request, res:Response) => {
  try {
    const body:userProps = req.body;
    const { name, email, password } = body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res
        .status(400)
        .json({ message: "Já existe um usuário cadastrado com este email." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    res.status(201).json({ message: "Usuário criado com sucesso", user });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Ocorreu um erro interno no servidor", error });
  }
};