import React from 'react';
import { useState } from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

export default function TableHeader({ columns, handleSorting }) {
    const [sortField, setSortField] = useState('');
    const [order, setOrder] = useState('none');

    const handleSortingChange = (key) => {
        const sortOrder =
            order === 'none'
                ? 'asc'
                : key === sortField && order === 'asc'
                ? 'desc'
                : 'none';
        setSortField(key);
        setOrder(sortOrder);
        handleSorting(key, sortOrder);
    };

    return (
        <thead>
            <tr>
                {columns.map(({ header, key }) => {
                    return (
                        <th key={key} onClick={() => handleSortingChange(key)}>
                            <div className="header-content">
                                {header}
                                {key !== sortField || order === 'none' ? (
                                    <div className="arrow-wrapper">
                                        <IoIosArrowUp className="arrow-up default" />
                                        <IoIosArrowDown className="arrow-down default" />
                                    </div>
                                ) : order === 'asc' ? (
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
