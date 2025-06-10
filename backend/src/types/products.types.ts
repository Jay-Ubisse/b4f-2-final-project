import { ICategory } from './category.types.ts';
import mongoose from 'mongoose';
import { Schema } from 'mongoose';

interface IProduct{
    name:string;
    price:number;
    category:ICategory;
}

export {IProduct};