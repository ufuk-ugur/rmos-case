"use client";

import * as React from "react";
import {useState} from "react";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {ChevronDown} from "lucide-react";
import {Table, TableBody, TableCell, TableHead, TableHeader, TableRow} from "@/components/ui/table";
import {ColumnDef, flexRender, getCoreRowModel, RowData, useReactTable, VisibilityState} from "@tanstack/react-table";
import {DateColumn} from "@/components/custom/date-column";
import {NumberColumn} from "@/components/custom/number-column";
import {PercentColumn} from "@/components/custom/percent-column";
import useStore from "@/store/useStore";
import {ForecastValueItem} from "@/types/response.interface";

export const columns: ColumnDef<RowData>[] = [
    {
        accessorKey: "Tarih",
        header: "Tarih",
        cell: ({row}) => <DateColumn row={row} columnKey={"Tarih"}/>,
    },
    {
        accessorKey: "Mevcut",
        header: "Mevcut",
        cell: ({row}) => <NumberColumn row={row} columnKey={"Mevcut"}/>,
    },
    {
        accessorKey: "Oda",
        header: "Oda",
        cell: ({row}) => <NumberColumn row={row} columnKey={"Oda"}/>,
    },
    {
        accessorKey: "Yetişkin",
        header: "Yetişkin",
        cell: ({row}) => <NumberColumn row={row} columnKey={"Yetişkin"}/>,
    },
    {
        accessorKey: "Çocuk",
        header: "Çocuk",
        cell: ({row}) => <NumberColumn row={row} columnKey={"Çocuk"}/>,
    },
    {
        accessorKey: "Free",
        header: "Free",
        cell: ({row}) => <NumberColumn row={row} columnKey={"Free"}/>,
    },
    {
        accessorKey: "Toplam Kişi",
        header: "Toplam Kişi",
        cell: ({row}) => <NumberColumn row={row} columnKey={"Toplam Kişi"}/>,
    },
    {
        accessorKey: "Pax",
        header: "Pax",
        cell: ({row}) => <NumberColumn row={row} columnKey={"Pax"}/>,
    },
    {
        accessorKey: "Yuzde%(Net)",
        header: "Yuzde%(Net)",
        cell: ({row}) => <PercentColumn row={row} columnKey={"Yuzde%(Net)"} digits={3}/>,
    },
    {
        accessorKey: "Son Durum",
        header: "Son Durum",
        cell: ({row}) => <NumberColumn row={row} columnKey={"Son Durum"}/>,
    },
    {
        accessorKey: "Package Tutar",
        header: "Package Tutar",
        cell: ({row}) => <NumberColumn row={row} columnKey={"Package Tutar"} digits={2}/>,
    },
    {
        accessorKey: "Gun Tarih",
        header: "Gun Tarih",
    },
    {
        accessorKey: "Pax(Y/C2)",
        header: "Pax(Y/C2)",
        cell: ({row}) => <NumberColumn row={row} columnKey={"Pax(Y/C2)"} digits={2}/>,
    },
];

interface ForecastTableProps {
    data: ForecastValueItem[];
}

const ForecastTable: React.FC<ForecastTableProps> = ({data}) => {
    const loading = useStore((state) => state.loading);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            columnVisibility,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center pb-4">
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Sütunlar <ChevronDown/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
                                    return (
                                        <TableHead key={header.id} className={"border-r"}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className={"border-r"}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {loading ? 'Loading...' : 'No results'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}

export default ForecastTable;
