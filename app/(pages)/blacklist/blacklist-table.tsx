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
import {
    ColumnDef,
    ColumnFiltersState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    RowData,
    SortingState,
    useReactTable,
    VisibilityState
} from "@tanstack/react-table";
import {Dialog, DialogContent, DialogTrigger,} from "@/components/ui/dialog";
import {DateColumn} from "@/components/custom/date-column";
import {BlacklistValueItem} from "@/types/response.interface";
import {DataTablePagination} from "@/components/custom/datatable-pagination";
import BlacklistForm from "@/app/(pages)/blacklist/blacklist-form";
import {PostBlacklistFormProps} from "@/types/payload.interface";
import useStore from "@/store/useStore";

export const columns: ColumnDef<RowData>[] = [
    {
        accessorKey: "Adi",
        header: "Adı",
    },
    {
        accessorKey: "Soy",
        header: "Soyadı",
    },
    {
        accessorKey: "Tcno",
        header: "TCKN",
    },
    {
        accessorKey: "Kimlik_no",
        header: "Kimlik No",
    },
    {
        accessorKey: "Dogum_tarihi",
        header: "Doğum Tarihi",
        cell: ({row}) => <DateColumn row={row} columnKey={"Dogum_tarihi"}/>,
    },
    {
        accessorKey: "Sistem_tarihi",
        header: "Sistem Tarihi",
        cell: ({row}) => <DateColumn row={row} columnKey={"Sistem_tarihi"}/>,
    },
    {
        accessorKey: "Aciklama",
        header: "Açıklama",
    },
    {
        accessorKey: "Xml Kodu",
        header: "Milliyet",
    },
    {
        accessorKey: "Kulanici",
        header: "Kullanıcı",
    }
];

interface BlacklistTableProps {
    data: BlacklistValueItem[];
}

const BlacklistTable: React.FC<BlacklistTableProps> = ({data}) => {
    const loading = useStore((state) => state.loading);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [createDialog, setCreateDialog] = useState<boolean>(false);
    const [updateDialog, setUpdateDialog] = useState<boolean>(false);

    const table = useReactTable({
        data,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    })

    return (
        <div className="w-full">
            <div className="flex items-center pb-4">
                <BlacklistForm data={{Id: 0}}>
                    <Button>Blacklist Ekle</Button>
                </BlacklistForm>
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
                                <BlacklistForm
                                    data={row.original as PostBlacklistFormProps}
                                >
                                    <TableRow>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id} className={"border-r"}>
                                                {flexRender(
                                                    cell.column.columnDef.cell,
                                                    cell.getContext()
                                                )}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </BlacklistForm>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center"
                                >
                                    {loading ? 'Yükleniyor...' : 'Sonuç yok'}
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <DataTablePagination table={table}/>
        </div>
    )
        ;
}

export default BlacklistTable;
