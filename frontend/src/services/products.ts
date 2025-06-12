import api from "./axios-instance";

export async function getProduct({ id }: { id: string }) {
  try {
    const response = await api.get(`/products/${id}`);
    console.log(response.data);
  } catch (error) {}
}
