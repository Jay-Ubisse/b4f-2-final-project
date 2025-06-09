import mongoose from "mongoose";

const userschema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: String, enum: ['Admin', 'Costumer']
});

export const User = mongoose.model("user", userschema);