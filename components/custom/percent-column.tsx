import React from 'react';
import { Row } from "@tanstack/react-table";

interface PercentColumnProps<TData> {
    row: Row<TData>;
    columnKey: string;
    digits?: number;
}

export const PercentColumn = <TData,>({ row, columnKey, digits = 0 }: PercentColumnProps<TData>) => {
    const amount = parseFloat(row.getValue(columnKey) as string) * 100;
    const formatted = new Intl.NumberFormat("tr-TR", {
        minimumFractionDigits: digits,
        maximumFractionDigits: digits,
    }).format(amount);

    return <div className="text-right font-medium">%{formatted}</div>;
};
