"use client"

import { useState } from "react"
import { Card, CardContent } from "../../components/ui/card"
import { Button } from "../../components/ui/button"
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../../components/ui/select"

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
}
interface Product {
  _id: string;
  name: string;
  price: number;
  stock: number;
  description?: string;
  colors: string[];
  sizes: string[];
}

interface Order {
  _id: string;
  user: User;
  userId: string;
  items: Product[];
  status: string;
  total: number;
  createdAt: string;
}

interface OrderListProps {
  orders: Order[]
  onUpdateStatus: (id: string, status: string) => Promise<void>
}

const FILTER_ALL_VALUE = "all"
const STATUS_OPTIONS = ["pendent", "shipped", "delivered"]

export default function OrderList({ orders, onUpdateStatus }: OrderListProps) {
  const [filterStatus, setFilterStatus] = useState<string>("")
  const [editableStatuses, setEditableStatuses] = useState<Record<string, string>>({})
  const [loadingIds, setLoadingIds] = useState<Set<string>>(new Set())

  const filteredOrders = filterStatus === FILTER_ALL_VALUE || filterStatus === ""
    ? orders
    : orders.filter((order) => order.status === filterStatus)

  const handleStatusChange = (id: string, newStatus: string) => {
    setEditableStatuses((prev) => ({ ...prev, [id]: newStatus }))
  }

  const handleSave = async (id: string) => {
    const newStatus = editableStatuses[id]
    if (!newStatus) return

    setLoadingIds((prev) => new Set(prev).add(id))
    try {
      await onUpdateStatus(id, newStatus)
    } catch (error) {
      console.error("Erro ao atualizar status do pedido:", error)
    } finally {
      setLoadingIds((prev) => {
        const newSet = new Set(prev)
        newSet.delete(id)
        return newSet
      })
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <h2 className="text-xl font-semibold mb-4">Requests</h2>

        {/* Status filter */}
        <div className="mb-4 flex items-center space-x-2">
          <label htmlFor="filterStatus" className="text-sm font-medium">
            Filter :
          </label>
          <Select
            value={filterStatus}
            onValueChange={(value) => setFilterStatus(value)}
          >
            <SelectTrigger id="filterStatus" className="w-48">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={FILTER_ALL_VALUE}>All</SelectItem>
              {STATUS_OPTIONS.map((status) => (
                <SelectItem key={status} value={status}>
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {filteredOrders.length === 0 ? (
          <p className="text-muted-foreground text-center">
            Nenhum pedido encontrado
          </p>
        ) : (
          <ul className="space-y-2">
            {filteredOrders.map((order) => {
              console.log(order.items)
              const currentStatus = editableStatuses[order._id] ?? order.status
              const isLoading = loadingIds.has(order._id)

              return (
                <li
                  key={order._id}
                  className="border p-2 rounded flex justify-between items-center"
                >
                  <div>
                    <strong>Request ID: {order._id}</strong>
                    <p className="text-sm text-muted-foreground">
                      User: {order.user ? order.user.name : "Unknown User"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Date: {new Date(order.createdAt).toLocaleDateString()}
                    </p>
                   
  <p className="text-sm text-muted-foreground">
  Items:{" "}
  {order.items && order.items.length > 0
    ? order.items.map((item: Product) => item.name).join(", ")
    : "No items"}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Total: {order.total} MZN
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Select
                      value={currentStatus}
                      onValueChange={(value) =>
                        handleStatusChange(order._id, value)
                      }
                      disabled={isLoading}
                    >
                      <SelectTrigger className="w-40">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {STATUS_OPTIONS.map((status) => (
                          <SelectItem key={status} value={status}>
                            {status.charAt(0).toUpperCase() + status.slice(1)}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <Button
                      onClick={() => handleSave(order._id)}
                      disabled={isLoading || currentStatus === order.status}
                      size="sm"
                    >
                      {isLoading ? "Saving..." : "Save"}
                    </Button>
                  </div>
                </li>
              )
            })}
          </ul>
        )}
      </CardContent>
    </Card>
  )
}
