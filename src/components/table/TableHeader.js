import React from 'react';
import { IoIosArrowUp, IoIosArrowDown } from 'react-icons/io';

/**
 * Component for the table headers.
 * Props :
 * - columns : headers
 * - sortField/setSortField : value and setter of useState in Table.js, field = a header
 * - sortOrder/setSortOrder : value and setter of the useState in Table.js, order = none/asc/desc
 */

export default function TableHeader({ columns, sortField, setSortField, sortOrder, setSortOrder }) {

    /**
     * Handles the sorting when a header is clicked.
     * Retrieves which header has been clicked, the key.
     * Then the new order is set depending of the old state.
     * If none => asc, if asc => desc, if desc => none.
     * If it's a new header then old => none and new => asc.
     */
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
