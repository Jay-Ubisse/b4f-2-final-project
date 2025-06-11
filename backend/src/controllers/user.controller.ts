import { Request, Response,NextFunction } from 'express'
import bcrypt from 'bcrypt'
import { userProps } from '../types/types.ts';
import { User } from '../models/user.model.ts'

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

export const getMe=(req:Request,res:Response)=> {
  try {
    res.status(200).json((req as any ).user)

  } catch (error) {
    console.log(error)
    res.status(500).json({ message: 'Erro ao buscar os dados do usuário' })
  }
}


import { Request, Response } from "express";
import { User } from "../models/user.model.js";

export function createUser(req: Request, res: Response) {}

