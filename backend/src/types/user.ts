import { Document } from "mongoose";

export interface UserProps extends Document {
  name: string;
  email: string;
  password: string;
  role: string; // e.g., 'admin', 'custimer'
}