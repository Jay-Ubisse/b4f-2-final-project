import { useEffect, useState } from "react"
import { toast } from "react-hot-toast"
import { Button } from "./../components/ui/button"
import { Card, CardContent } from "./../components/ui/card"
import { Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle, } from "./../components/ui/dialog"
import { Input } from "./../components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./../components/ui/select"
import { createCategories, createProducts, getOrders, getProducts, getUsers, updateOrderStatus } from "../services/admin"

interface User {
  _id: string
  name: string
  email: string
  role: string
}

interface Order {
  _id: string
  userId: string
  status: string
}

interface Product {
  _id?: string
  name: string
  price: number
  categoryId: string
  imageUrl: string
  description: string
  colors: string[]
  sizes: string[]
  stock: number
  category?: {
    _id: string
    name: string
  }
}

export function AdminPage() {
  const [users, setUsers] = useState<User[]>([])
  const [orders, setOrders] = useState<Order[]>([])
  const [products, setProducts] = useState<Product[]>([])
  const [newCategory, setNewCategory] = useState({ name: "", description: "" })
  const [newProduct, setNewProduct] = useState<Product>({
    name: "",
    price: 0,
    categoryId: "",
    imageUrl: "",
    description: "",
    colors: [],
    sizes: [],
    stock: 0
  })

  const fetchData = async () => {
    try {
      const [usersRes, ordersRes, productsRes] = await Promise.all([
        getUsers(),
        getOrders(),
        getProducts()
      ])
      setUsers(usersRes)
      setOrders(ordersRes)
      setProducts(productsRes)
    } catch (error) {
      toast.error("Erro ao buscar dados", { id: "fetch-error" })
      console.error(error)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const updateOrderStatusHandler = async (id: string, status: string) => {
    try {
      await updateOrderStatus(id, status)
      toast.success("Status atualizado com sucesso", { id: `order-${id}` })
      fetchData()
    } catch (error) {
      toast.error("Erro ao atualizar status do pedido", { id: `order-error-${id}` })
    }
  }

  const handleAddCategory = async () => {
    try {
      const response = await createCategories(newCategory)
      if (response?.status === 201) {
        toast.success("Categoria criada com sucesso", { id: "cat-success" })
        setNewCategory({ name: "", description: "" })
        fetchData()
      }
    } catch (error: any) {
      if (error.response?.status === 400) {
        toast.error("Categoria já existente", { id: "cat-exists" })
      } else {
        toast.error("Erro ao criar categoria", { id: "cat-error" })
      }
    }
  }

  const handleAddProduct = async () => {
    try {
      const response = await createProducts(newProduct)
      if (response?.status === 201) {
        toast.success("Produto adicionado com sucesso", { id: "prod-success" })
        setNewProduct({
          name: "",
          price: 0,
          categoryId: "",
          imageUrl: "",
          description: "",
          colors: [],
          sizes: [],
          stock: 0
        })
        fetchData()
      }
    } catch (error) {
      toast.error("Erro ao adicionar produto", { id: "prod-error" })
      console.error(error)
    }
  }

  return (
    <div className="p-6 space-y-10">
      <h1 className="text-3xl font-bold">Admin Dashboard</h1>

      {/* Modal Add Category */}
      <Dialog>
        <DialogTrigger asChild>
          <Button className="mx-2">Add Category</Button>
        </DialogTrigger>
        <DialogContent className="space-y-4">
          <DialogTitle>Add New Category</DialogTitle>
          <h2 className="text-xl font-semibold">Add New Category</h2>
          <Input
            placeholder="Category name"
            value={newCategory.name}
            onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
          />
          <Input
            placeholder="Description (optional)"
            value={newCategory.description}
            onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
          />
          <Button onClick={handleAddCategory}>Submit</Button>
        </DialogContent>
      </Dialog>

      {/* Modal Add Product */}
      <Dialog>
        <DialogTrigger asChild>
          <Button>Add Product</Button>
        </DialogTrigger>
        <DialogContent className="space-y-4">
          <DialogTitle>Add New Product</DialogTitle>
          <h2 className="text-xl font-semibold">Add New Product</h2>
          <Input placeholder="Name" value={newProduct.name} onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })} />
          <Input placeholder="Price" type="number" value={newProduct.price} onChange={(e) => setNewProduct({ ...newProduct, price: parseFloat(e.target.value) })} />
          <Select onValueChange={(value) => setNewProduct({ ...newProduct, categoryId: value })}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {[...new Map(products.map(p => [p.category?._id, p.category])).values()]
                .filter(Boolean)
                .map((cat) => (
                  <SelectItem key={cat!._id} value={cat!._id}>{cat!.name}</SelectItem>
                ))}
            </SelectContent>
          </Select>
          <Input placeholder="Image URL" value={newProduct.imageUrl} onChange={(e) => setNewProduct({ ...newProduct, imageUrl: e.target.value })} />
          <Input placeholder="Description" value={newProduct.description} onChange={(e) => setNewProduct({ ...newProduct, description: e.target.value })} />
          <Input placeholder="Colors (comma separated)" value={newProduct.colors.join(",")} onChange={(e) => setNewProduct({ ...newProduct, colors: e.target.value.split(",") })} />
          <Input placeholder="Sizes (comma separated)" value={newProduct.sizes.join(",")} onChange={(e) => setNewProduct({ ...newProduct, sizes: e.target.value.split(",") })} />
          <Input placeholder="Stock" type="number" value={newProduct.stock} onChange={(e) => setNewProduct({ ...newProduct, stock: parseInt(e.target.value) })} />
          <Button type="submit" onClick={handleAddProduct}>Submit</Button>
        </DialogContent>
      </Dialog>

      {/* Users */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <ul className="space-y-2">
            {Array.isArray(users) && users.map(user => (
              <li key={user._id} className="border p-2 rounded">
                {user.name} ({user.email}) - Role: {user.role}
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      {/* Orders */}
      <Card>
        <CardContent className="p-4">
          <h2 className="text-xl font-semibold mb-4">Orders</h2>
          <ul className="space-y-2">
            {Array.isArray(orders) && orders.map(order => (
              <li key={order._id} className="border p-2 rounded flex justify-between items-center">
                Order ID: {order._id} — Status:
                <Select value={order.status} onValueChange={(value) => updateOrderStatusHandler(order._id, value)}>
                  <SelectTrigger className="w-40 ml-2">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="processing">Processing</SelectItem>
                    <SelectItem value="delivered">Delivered</SelectItem>
                    <SelectItem value="canceled">Canceled</SelectItem>
                  </SelectContent>
                </Select>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
