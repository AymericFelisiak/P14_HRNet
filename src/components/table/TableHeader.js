import React, { useEffect } from 'react';
import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

export default function TableHeader({ columns, sortField, setSortField, sortOrder, setSortOrder }) {

    const handleSortingChange = (key) => {
        const newSortOrder =
            sortOrder === 'none'
                ? 'asc'
                : key === sortField && sortOrder === 'asc'
                ? 'desc'
                : key === sortField
                ? 'none'
                : 'asc';
        setSortField(key);
        setSortOrder(newSortOrder);
    };

    return (
        <thead>
            <tr>
                {columns.map(({ header, key }) => {
                    return (
                        <th key={key} onClick={() => handleSortingChange(key)}>
                            <div className="header-content">
                                {header}
                                {key !== sortField || sortOrder === 'none' ? (
                                    <div className="arrow-wrapper">
                                        <IoIosArrowUp className="arrow-up default" />
                                        <IoIosArrowDown className="arrow-down default" />
                                    </div>
                                ) : sortOrder === 'asc' ? (
                                    <div className="arrow-wrapper">
                                        <IoIosArrowUp className="arrow-up sorted" />
                                        <IoIosArrowDown className="arrow-down default" />
                                    </div>
                                ) : (
                                    <div className="arrow-wrapper">
                                        <IoIosArrowUp className="arrow-up default" />
                                        <IoIosArrowDown className="arrow-down sorted" />
                                    </div>
                                )}
                            </div>
                        </th>
                    );
                })}
            </tr>
        </thead>
    );
}
