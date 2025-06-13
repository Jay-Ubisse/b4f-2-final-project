"use client"

import {
    flexRender,
    getCoreRowModel,
    getSortedRowModel,
    useReactTable,
   
} from "@tanstack/react-table";

import  {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "./ui/table";

import type { ColumnDef } from "@tanstack/react-table";

interface DataTableProps<TData> {
    columns: ColumnDef<TData, any>[];
    data: TData[];
    onRowClick?: (row: TData) => void;
}

export function DataTable<TData>({ columns, data, onRowClick }: DataTableProps<TData>) {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
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
                    <TableRow
                        key={row.id}
                        onClick={() => onRowClick?.(row.original)}
                    >
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
    );
}