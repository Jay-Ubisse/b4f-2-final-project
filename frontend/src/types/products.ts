export interface ProductProps {
  _id: string;
  name: string;
  price: number;
  imageUrl: string;
  categoryId: string;
  description: string;
  colors: string[];
  sizes: string[];
  stock: number;
}

// a mesma tipagem do mongoDB