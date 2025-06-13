//import { OrderProps } from "../types/order";
import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../components/ui/dropdown-menu"
import { payments } from "./payment";
import { MoreHorizontal } from "lucide-react"

export const columns: ColumnDef<typeof payments[number]>[] = [
  {
    header: "Order ID",
    accessorKey: "orderId",
  },
  {
    header: "Customer Name",
    accessorKey: "customerName",
  },
  {
    header: "Items",
    accessorKey: "items",
    cell: ({ row }) => (
      <ul>
        {row.original.items.map((item) => (
          <li key={item.itemId}>
            {item.itemId} (Qty: {item.quantity}, Price: ${item.price})
          </li>
        ))}
      </ul>
    ),
  },
  {
    header: "Total Amount",
    accessorKey: "totalAmount",
  },
  {
    header: "Order Date",
    accessorKey: "orderDate",
  },
  {
    header: "Status",
    accessorKey: "status",
  },
  {
    header: "Shipping Address",
    accessorKey: "shippingAddress.city",
  },

  {
    header: "Actions",
    id: "actions",
    cell: () => (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button className="p-2 rounded hover:bg-gray-100">
            <MoreHorizontal className="h-4 w-4" />
          </button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => navigator.clipboard.writeText(JSON.stringify(payments))}>
            Copy Payments
          </DropdownMenuItem>
          <DropdownMenuItem>Edit Order</DropdownMenuItem>
          <DropdownMenuItem>Delete Order</DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View Details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    ),
  },
];

