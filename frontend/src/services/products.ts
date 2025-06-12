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

export async function getProductsById({
  id,
}: {
  id: string;
}): Promise<Products | undefined> {
  try {
    const res = await fetch(`/products/${id}`);
    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Erro ao buscar produto por ID:", err);
  }
}
