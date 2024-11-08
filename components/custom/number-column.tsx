import React from 'react';
import { Row } from "@tanstack/react-table";

interface NumberColumnProps<TData> {
    row: Row<TData>;
    columnKey: string;
    digits?: number;
}

export const NumberColumn = <TData,>({ row, columnKey, digits = 0 }: NumberColumnProps<TData>) => {
    const amount = parseFloat(row.getValue(columnKey) as string);
    const formatted = new Intl.NumberFormat("tr-TR", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(amount);

    return <div className="text-right font-medium">{formatted}</div>;
};
