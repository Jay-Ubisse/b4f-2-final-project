import jwt from "jsonwebtoken";
import dotenv from "dotenv"

import {Response, Request,NextFunction} from "express";
dotenv.config()

export const authentionToken=(req:Request, res:Response, next:NextFunction)=>{
const authHeader=req.headers["authorization"] 

const token=authHeader && authHeader.split(" ")[1];

 if (!token) {
    return res.status(401).json({ mensagem: "Usuário não autenticado." });
  }

  const jwtSecret=process.env.JWT_SECRET
  jwt.verify(token, jwtSecret as string, (err, user) => {
    if (err) return res.status(403).json({ mensagem: "Token inválido" });
  
    (req as any).user = user;
    next();
  });

}