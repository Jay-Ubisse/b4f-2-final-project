export interface CategoryProps {
    id : number;
    name: string ;
    products: Array<{id: number, name: string, color: string, size: string, price: number}>;
}