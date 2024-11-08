import React from 'react';
import {Row} from "@tanstack/react-table";

interface DateColumnProps<TData> {
    row: Row<TData>;
    columnKey: string;
}

export const DateColumn = <TData, >({row, columnKey}: DateColumnProps<TData>) => {
    const date = new Date(row.getValue(columnKey));
    const formattedDate = new Intl.DateTimeFormat('tr-TR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    }).format(date);

    return <div>{formattedDate}</div>
};
