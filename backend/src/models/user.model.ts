import mongoose, { Schema } from "mongoose";
import { userProps } from "../types/types.ts";
import { CategoryProps } from "../types/category.ts";
import { UserProps, ProductProps } from "../types/user.ts";

const userschema = new mongoose.Schema<userProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },

  role: { type: String, enum: ["Admin", "Costumer"] },
});

export const Users = mongoose.model("users", userschema);



const userSchema = new Schema<UserProps>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    required: true,
    enum: ["admin", "customer"],
    default: "customer",
  },
});

export const User = mongoose.model<UserProps>("User", userSchema);



