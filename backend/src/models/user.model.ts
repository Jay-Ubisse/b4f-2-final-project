import mongoose from "mongoose";
import { userProps } from "../types/user.types.ts"; 
const userschema = new mongoose.Schema<userProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{ type: String, enum: ['Admin', 'Costumer']}
});

export const User = mongoose.model("user", userschema);



