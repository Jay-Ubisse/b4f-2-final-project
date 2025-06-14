export type Products = {
  _id: string;
  name: string;
  colors: string[];
  sizes: string[];
  price: number;
  description: string;
  imageUrl: string;
  categoryId: string;
  stock: number;
};

export async function getProducts({
  id,
}: {
  id: string;
}): Promise<Products | undefined> {
  try {
    const res = await fetch(`/products/`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar produto por ID:", err);
  }
}
