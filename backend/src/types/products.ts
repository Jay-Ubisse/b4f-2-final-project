export interface ProductsProps {
    id: number;
    name: string;
    color: string;
    size: "S" | "M" | "L" | "XL" | "XXL" | "XXXL" | string;
    category: "Camisetas" | "Calças" | "Saias" | "Vestidos" | "Casacos" | "Acessorios" ;
    price: number;
}