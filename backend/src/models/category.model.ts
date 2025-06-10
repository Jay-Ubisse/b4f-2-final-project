import type { CategoryProps } from "../types/category.ts";

export const categoriesProducts = <CategoryProps[]>[
  {
    id: 1,
    name: "Camisetas",
    products: [
      {
        id: 1,
        name: "Camiseta Básica Branca",
        color: "Branco",
        size: "M",
        price: 49.90
      },
      {
        id: 6,
        name: "Camiseta Estampada Preta",
        color: "Preto",
        size: "XXL",
        price: 59.90
      }
    ]
  },
  {
    id: 2,
    name: "Calças",
    products: [
      {
        id: 2,
        name: "Calça Jeans Slim",
        color: "Azul",
        size: "36",
        price: 129.90
      },
      {
        id: 7,
        name: "Calça Sarja Marrom",
        color: "Marrom",
        size: "40",
        price: 119.90
      }
    ]
  },
  {
    id: 3,
    name: "Saias",
    products: [
      {
        id: 5,
        name: "Saia Midi Listrada",
        color: "Cinza",
        size: "M",
        price: 79.90
      }
    ]
  },
  {
    id: 4,
    name: "Vestidos",
    products: [
      {
        id: 3,
        name: "Vestido Floral Leve",
        color: "Rosa",
        size: "L",
        price: 89.90
      }
    ]
  },
  {
    id: 5,
    name: "Casacos",
    products: [
      {
        id: 4,
        name: "Jaqueta Corta-Vento",
        color: "Preto",
        size: "XL",
        price: 199.90
      }
    ]
  },
  {
    id: 6,
    name: "Acessórios",
    products: [
      {
        id: 8,
        name: "Boné de Algodão",
        color: "Verde",
        size: "L",
        price: 39.90
      },
      {
        id: 9,
        name: "Gorro",
        color: "Marrom",
        size: "S",
        price: 69.90
      }
    ]
  }
];