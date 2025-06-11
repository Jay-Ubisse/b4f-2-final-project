import jwt from "jsonwebtoken";
import dotenv from "dotenv"

import {Response, Request,NextFunction} from "express";
dotenv.config()

export const authentionToken = (req: Request, res: Response, next: NextFunction) => {
const authHeader = req.headers["authorization"] as string | undefined;

const token=authHeader && authHeader.split(" ")[1];

 if (!token) {
   res.status(401).json({ mensagem: "Usuário não autenticado." });
    return 
  }

  const jwtSecret=process.env.JWT_SECRET 
  jwt.verify(token, jwtSecret as string, (err, user) => {
    if (err) res.status(403).json({ mensagem: "Token inválido" });
  
    (req as any).user = user;
    next();
  });

}

/*
export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
 
    res.status(401).json({ mensagem: "Usuário não autenticado." });
    return 
  }

  jwt.verify(token, process.env.JWT_SECRET as string, (err, user) => {
    if (err) return res.status(403).json({ mensagem: "Token inválido" });

    (req as any).user = user;
    next();
  });
};

export const authorizeRole = (role: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user;

    if (!user || user.role !== role) {
      return res.status(403).json({ mensagem: "Acesso negado: permissão insuficiente." });
    }

    next();
  };
};*/