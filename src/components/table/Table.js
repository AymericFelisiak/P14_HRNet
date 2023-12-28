import React, { useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

export default function Table({ className, headers, data }) {
    const [tableData, setTableData] = useState(data);

    const handleSorting = (sortField, sortOrder) => {
        if (sortOrder === 'none') setTableData(data);
        else if (sortField) {
            const sorted = [...tableData].sort((a, b) => {
                if (a[sortField] === null) return 1;
                if (b[sortField] === null) return -1;
                if (a[sortField] === null && b[sortField] === null) return 0;
                return (
                    a[sortField]
                        .toString()
                        .localeCompare(b[sortField].toString(), 'en', {
                            numeric: true
                        }) * (sortOrder === 'asc' ? 1 : -1)
                );
            });
            setTableData(sorted);
        }
    };

    return (
        <>
            <table className={className}>
                <TableHeader columns={headers} handleSorting={handleSorting} />
                <TableBody columns={headers} data={tableData} />
            </table>
        </>
    );
}
