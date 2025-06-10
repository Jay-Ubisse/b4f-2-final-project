import mongoose from "mongoose";
import { userProps } from "../types/types.ts";

const userschema = new mongoose.Schema<userProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type:String, enum: ['Admin', 'Customer'], default: 'Customer'}
});

export const User = mongoose.model<userProps>("User", userschema);