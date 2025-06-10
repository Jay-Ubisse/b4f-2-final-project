import { Request, Response } from 'express';
import bcrypt from "bcrypt";
import { User } from '../models/user.model.ts';


export const login = async (req: Request, res: Response) => {
  const body = req.body;
  const { email, password , role} = body;

  const user = await User.findOne({ email, role });

    if (!user) {
      return res.status(401).json({ message: "Email ou palavra-passe incorreto." });
    }

  const isEqual = await bcrypt.compare(password, user.password);

  if (!user || !isEqual) {
   return res.status(401).json({ message: "Email ou palavra-passe incorreto." });
  }

  res.status(200).json({ message: "Seja bem vindo Devolta", user});
}