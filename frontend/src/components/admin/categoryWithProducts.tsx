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
  const [searchTerm, setSearchTerm] = useState("")

  const fetchCategoriesWithProducts = async () => {
    try {
      const fetchedCategories = await getCategories()
      setCategories(fetchedCategories)

      const productFetches = await Promise.all(
        fetchedCategories.map(async (cat: Category) => {
          const products = await getCategoryProducts(cat._id)
          return { categoryId: cat._id, products }
        })
      )

      const productsMap: Record<string, Product[]> = {}
      productFetches.forEach(({ categoryId, products }) => {
        productsMap[categoryId] = products
      })

      setCategoryProducts(productsMap)
    } catch (error) {
      console.error("Erro ao buscar categorias e produtos:", error)
    }
  }

  useEffect(() => {
    fetchCategoriesWithProducts()
  }, [])

  // Verifica se algum produto (de qualquer categoria) passa no filtro de busca
  const hasAnyProduct = Object.values(categoryProducts).some((list) =>
    list.some((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
  )

  return (
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Procurar produtos..."
        className="w-full p-2 border rounded-md outline-none focus:ring-2 focus:ring-primary"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {!hasAnyProduct && (
        <p className="text-center text-muted-foreground mt-4">Nenhum produto encontrado.</p>
      )}

      {categories.map((category) => {
        const allProducts = categoryProducts[category._id] || []
        const filteredProducts = allProducts.filter((product) =>
          product.name.toLowerCase().includes(searchTerm.toLowerCase())
        )

        if (filteredProducts.length === 0) return null

        return (
          <Card key={category._id}>
            <CardContent className="p-4">
              <h3 className="text-lg font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {category.description || "Sem descrição"}
              </p>
              <ul className="text-sm space-y-1">
                {filteredProducts.map((product) => (
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
