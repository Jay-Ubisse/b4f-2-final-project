import {
    getPaginationRowModel,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getFilteredRowModel
    
} from '@tanstack/react-table';
import { Input } from '../ui/input';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import * as React from "react"

import {
    Table,
    TableBody,
    TableCell,  
    TableHead,
    TableHeader,
    TableRow,

} from "../../components/ui/table";
import { Button } from '../ui/button';

import { type   VisibilityState,  type ColumnDef, type ColumnFiltersState, } from "@tanstack/react-table";



// import Link from "next/link"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: any[];
}

export function DataTable<TData, TValue>({
    columns,
    data,
}: DataTableProps<TData, TValue>) {
     const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  )
    const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({})
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onColumnFiltersChange: setColumnFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
      columnVisibility,
      columnFilters,
    },
    });

    return (
        <div className="rounded-md bg-gray-300 border">
             <div className="flex items-center py-4">
        <Input
          placeholder="Filter nome..."
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />   <a href="/">
           <Button variant="outline" className="ml-auto">
              Ver Usuários
            </Button>
         </a>
         <a href="/">
           <Button variant="outline" className="ml-auto">
              Ver Usuários
            </Button>
         </a>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter(
                (column) => column.getCanHide()
              )
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

              </div>
            <Table>
                <TableHeader>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id}>
                                    {flexRender(
                                        header.column.columnDef.header,
                                        header.getContext()
                                    )}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id}>
                                    {flexRender(
                                        cell.column.columnDef.cell,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
}