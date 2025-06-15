"use client"

import { useEffect, useState } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { getCategories, getCategoryProducts } from "../../services/admin"

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
}

export function CategoryListWithProducts() {
  const [categories, setCategories] = useState<Category[]>([])
  const [categoryProducts, setCategoryProducts] = useState<Record<string, Product[]>>({})

  const fetchCategoriesWithProducts = async () => {
    try {
        console.log("Produtos por categoria:", categoryProducts);
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories)

      const productFetches = await Promise.all(
        fetchedCategories.map(async (cat: Category) => {
          const products = await getCategoryProducts(cat._id)
          return { categoryId: cat._id, products }
        })
      )

      const productsMap: Record<string, Product[]> = {}
      productFetches.forEach(
        ({ categoryId, products }: { categoryId: string; products: Product[] }) => {
          if (products.length > 0) {
            productsMap[categoryId] = products
          }
        }
      )

      setCategoryProducts(productsMap)
    } catch (error) {
      console.error("Erro ao buscar categorias e produtos:", error)
    }
  }

  useEffect(() => {
    fetchCategoriesWithProducts()
  }, [])

  return (
    <div className="space-y-4">
      {categories.map((category) => {
        const products = categoryProducts[category._id] || []

        if (products.length === 0) return null

        return (
          <Card key={category._id}>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description || "Sem descrição"}
              </p>
              <ul className="text-sm space-y-1">
                {products.map((product) => (
                  <li key={product._id} className="flex justify-between">
                    <span>{product.name}</span>
                    <span>{product.price} MZN</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
