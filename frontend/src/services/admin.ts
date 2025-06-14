import api from "./axios-instance";

export async function createCategories(categories: 
    { name: string; description?: string }) {
    try {
        const response = await api.post("/categories", categories);
        return response.data;
    } catch (error) {
        console.log("Error creating category:", error);
        return error;
    }
}

export async function createProducts(products: {
    name: string;
    price: number;
    categoryId: string;
    imageUrl: string;
    description: string;
    colors: string[];
    sizes: string[];
    stock: number;
}) {
    try {
        const response = await api.post("/products", products);
        return response.data;
    } catch (error) {
        console.log("Error creating product:", error);
        return error;
    }
}

export async function getUsers() {
    try {
        const response = await api.get("/users");
        return response.data;
    } catch (error) {
        console.log("Error fetching users:", error);
        return error;
    }
}
export async function getProducts() {
  try {
    const response = await api.get("/products")
    console.log("Resposta do createProducts:", response)
    const data = response.data

    if (Array.isArray(data)) {
      return data
    } else if (Array.isArray(data.products)) {
      return data.products
    } else {
      console.warn("getProducts: formato inesperado", data)
      return []
    }
  } catch (error) {
    console.log("Error fetching products:", error)
    return []
  }
}

export async function getOrders() {
  try {
    const response = await api.get("/orders")
    return response.data
  } catch (error) {
    console.log("Error fetching orders:", error)
    return []
  }
}

export async function updateOrderStatus(id: string, status: string) {
    try {
        const response = await api.patch(`/orders/${id}`, { status });
        return response.data;
    } catch (error) {
        console.log("Error updating order status:", error);
        return error;
    }
}



