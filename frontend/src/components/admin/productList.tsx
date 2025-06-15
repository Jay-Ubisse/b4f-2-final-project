import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import { Trash, Pencil } from "lucide-react"

interface Category {
  _id: string
  name: string
  description?: string
}

interface Product {
  _id: string
  name: string
  price: number
  stock: number
  categoryId?: Category["name"]
  imageUrl?: string
  description?: string
  colors: string[]
  sizes: string[]
}

interface ProductListProps {
  products: Product[]
  onEdit?: (product: Product) => void
  onDelete: (id: string) => void
}

export default function ProductList({ products, onEdit, onDelete }: ProductListProps) {
  if (products.length === 0) {
    return (
      <Card>
        <CardContent className="p-4 text-center">
          <p className="text-muted-foreground mb-2">No products found</p>
          <p className="text-sm text-gray-500">Try creating a new product</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Products</h2>
        <ul className="space-y-2">
          {products.map((product) => (
            <li key={product._id} className="border p-2 rounded">
              <div className="shadow-sm bg-muted/30 flex justify-between items-start">
                <div>
                  <strong>{product.name}</strong>
                  <p className="text-sm text-muted-foreground">Price: {product.price} MZN</p>
                  <p className="text-sm text-muted-foreground">Stock: {product.stock}</p>
                  <p className="text-sm text-muted-foreground">Category: {product.name}</p>
                  {product.description && (
                    <p className="text-sm text-muted-foreground">{product.description}</p>
                  )}
                </div>
                <div className="text-right text-sm space-y-1">
                  {product.colors.length > 0 && (
                    <p className="text-muted-foreground">Colors: {product.colors.join(", ")}</p>
                  )}
                  {product.sizes.length > 0 && (
                    <p className="text-muted-foreground">Sizes: {product.sizes.join(", ")}</p>
                  )}
                  {onEdit && (
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onEdit(product)}
                      className="mr-2"
                      title="Editar produto"
                    >
                      <Pencil size={16} />
                    </Button>
                  )}
                  <Button className="bg-red-700"
                  size="icon"
                  variant ="destructive"
                  onClick={() => onDelete(product._id)}
                  title="Eliminar categoria"
                >
                  <Trash size={16} />
                </Button>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  )
}
