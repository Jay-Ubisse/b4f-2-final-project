import { Dialog, DialogContent, DialogTitle, DialogDescription } from "../../components/ui/dialog"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { useEffect, useState } from "react"
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "../../components/ui/select"
import { Label } from "../ui/label"

interface Category {
  _id: string
  name: string
}

interface ProductModalProps {
  categories: Category[]
  onSubmit: (product: {
    name: string
    price: number
    categoryId: string
    imageUrl: string
    description: string
    colors: string[]
    sizes: string[]
    stock: number
  }) => Promise<void>
  isOpen: boolean
  onClose: () => void
  productToEdit?: {
    name: string
    price: number
    categoryId: string
    imageUrl: string
    description: string
    colors: string[]
    sizes: string[]
    stock: number
  } | null
}

export const ProductModal = ({ categories, onSubmit, isOpen, onClose, productToEdit }: ProductModalProps) => {
  const [form, setForm] = useState({
    name: "",
    price: 0,
    categoryId: "",
    imageUrl: "",
    description: "",
    colors: "",
    sizes: "",
    stock: 0,
  })

  // Preencher formulário ao editar
  useEffect(() => {
    if (productToEdit) {
      setForm({
        ...productToEdit,
        colors: productToEdit.colors.join(", "),
        sizes: productToEdit.sizes.join(", "),
      })
    } else {
      setForm({
        name: "",
        price: 0,
        categoryId: "",
        imageUrl: "",
        description: "",
        colors: "",
        sizes: "",
        stock: 0,
      })
    }
  }, [productToEdit, isOpen])

  const handleChange = (key: string, value: string | number) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async () => {
    if (!form.name.trim() || !form.categoryId || form.price <= 0) return
    await onSubmit({
      ...form,
      colors: form.colors.split(",").map((c) => c.trim()).filter(Boolean),
      sizes: form.sizes.split(",").map((s) => s.trim()).filter(Boolean),
    })
    onClose()
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogTitle>{productToEdit ? "Edit Product" : "New Product"}</DialogTitle>
        <DialogDescription>Fill all fields.</DialogDescription>
        <Label>Name</Label>
        <Input placeholder="Dress" value={form.name} onChange={(e) => handleChange("name", e.target.value)} />
        <Label>Price</Label>
        <Input placeholder="100" type="number" value={form.price} onChange={(e) => handleChange("price", Number(e.target.value))} />
        <Label>Category</Label>
        <Select value={form.categoryId} onValueChange={(v) => handleChange("categoryId", v)}>
          <SelectTrigger><SelectValue placeholder="Select a category" /></SelectTrigger>
          <SelectContent>
            {categories.map((cat) => (
              <SelectItem key={cat._id} value={cat._id}>
                {cat.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Label>Image URL</Label>
        <Input placeholder="Image URL" value={form.imageUrl} onChange={(e) => handleChange("imageUrl", e.target.value)} />
        <Label>Description</Label>
        <Input placeholder="Description of the item" value={form.description} onChange={(e) => handleChange("description", e.target.value)} />
        <Label>Colors</Label>
        <Input placeholder="Colors (separated by commas)" value={form.colors} onChange={(e) => handleChange("colors", e.target.value)} />
        <Label>Sizes</Label>
        <Input placeholder="Sizes (separated by commas)" value={form.sizes} onChange={(e) => handleChange("sizes", e.target.value)} />
        <Label>Stock</Label>
        <Input placeholder="Stock" type="number" value={form.stock} onChange={(e) => handleChange("stock", Number(e.target.value))} />

        <div className="mt-4 flex justify-end gap-2">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSubmit}>Save</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
