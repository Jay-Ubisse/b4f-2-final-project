import mongoose, { Document } from 'mongoose';

 export interface CategoryProps extends Document {
    name: string;
    description?:string;
    createdAt?: Date;
    updatedAt?: Date;
}

