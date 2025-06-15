
export async function getProductsById({ _id }: { _id: string }) {
  try {
    const res = await fetch(`/products${_id}`);
    if (!res.ok) throw new Error("Produto não encontrado");
    console.log(res)
    return await res.json();
  } catch (err) {
    console.error(err);
    return undefined;
  }
}
