import React, { useEffect, useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import DropDownMenu from 'p14_dropdownmenu';
import { useSelector } from 'react-redux';

export default function Table({ className, headers }) {
    const employees = useSelector((state) => state.employees.user);
    const [tableData, setTableData] = useState(employees);
    const [unsortedTable, setUnsortedTable] = useState();
    const [showEntries, setShowEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState();
    const [nextPageDisabled, setNextPageDisabled] = useState(false);
    const [previousPageDisabled, setPreviousPageDisabled] = useState(true);
    const [minIndex, setMinIndex] = useState(0);
    const [currentNumberOfEntries, setCurrentNumberOfEntries] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('none');

    useEffect(() => {
        if (tableData.length > 0) {
            const max = tableData.length / showEntries;
            if (Number.isInteger(max)) {
                setMaxPage(max);
            } else setMaxPage(Math.round(max) + 1);
        } else setMaxPage(1);
    }, [setMaxPage, showEntries, tableData.length]);

    const numberEntries = [
        { name: '10' },
        { name: '20' },
        { name: '30' },
        { name: '40' },
        { name: '50' }
    ];

    useEffect(() => {
        if (currentPage === 1) {
            setPreviousPageDisabled(true);
            setNextPageDisabled(false);
            if (maxPage === 1) setNextPageDisabled(true);
        } else {
            setPreviousPageDisabled(false);
            if (currentPage === maxPage) {
                setNextPageDisabled(true);
            } else {
                setNextPageDisabled(false);
            }
        }
    }, [currentPage, maxPage]);

    const nextPage = (e) => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
    };

    const previousPage = (e) => {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        setNextPageDisabled(false);
        if (newPage === 1) setPreviousPageDisabled(true);
        else setPreviousPageDisabled(false);
    };

    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase().toString();
        if (searchValue.length > 2) {
            if (currentPage > 1) setCurrentPage(1);
            setIsSearching(true);
            const results = employees
                .map((employee) => {
                    for (let i = 0; i < headers.length; i++) {
                        const key = headers[i].key;
                        if (employee[key].toLowerCase().includes(searchValue))
                            return employee;
                    }
                    return undefined;
                })
                .filter((employee) => employee !== undefined);
            setTableData(results);
            setUnsortedTable(results);
        } else if (isSearching) {
            setTableData(employees);
            setIsSearching(false);
            setUnsortedTable();
        }
    };

    /**
     * Handler for asc/desc sorting.
     * Needed for some edge case where sort is still selected when used deletes search keywords.
     */

    useEffect(() => {
        if (sortOrder === 'none') {
            if (isSearching) setTableData(unsortedTable);
            else setTableData(employees);
        } else if (sortField) {
            var sorted;
            if (!isSearching) {
                sorted = [...employees].sort((a, b) => {
                    if (a[sortField] === null) return 1;
                    if (b[sortField] === null) return -1;
                    if (a[sortField] === null && b[sortField] === null)
                        return 0;
                    return (
                        a[sortField]
                            .toString()
                            .localeCompare(b[sortField].toString(), 'en', {
                                numeric: true
                            }) * (sortOrder === 'asc' ? 1 : -1)
                    );
                });
            } else {
                sorted = [...tableData].sort((a, b) => {
                    if (a[sortField] === null) return 1;
                    if (b[sortField] === null) return -1;
                    if (a[sortField] === null && b[sortField] === null)
                        return 0;
                    return (
                        a[sortField]
                            .toString()
                            .localeCompare(b[sortField].toString(), 'en', {
                                numeric: true
                            }) * (sortOrder === 'asc' ? 1 : -1)
                    );
                });
            }
            setTableData(sorted);
        }
    }, [employees, isSearching, sortField, sortOrder, unsortedTable]);

    return (
        <main className="employees-table-container">
            <div className="employees-table-top">
                <div
                    className="entries-options-wrapper"
                    onChange={(e) => setShowEntries(e.target.value)}
                >
                    Show{' '}
                    <DropDownMenu
                        name="number-entries"
                        className=""
                        data={numberEntries}
                    />{' '}
                    entries
                </div>
                <div className="search">
                    <label htmlFor="search">Search: </label>
                    <input name="search" type="text" onChange={handleSearch} />
                </div>
            </div>
            <table className={className}>
                <TableHeader
                    columns={headers}
                    sortField={sortField}
                    setSortField={setSortField}
                    sortOrder={sortOrder}
                    setSortOrder={setSortOrder}
                />
                <TableBody
                    columns={headers}
                    data={tableData}
                    numberEntries={showEntries}
                    currentPage={currentPage}
                    setMinIndex={setMinIndex}
                    setCurrentNumberOfEntries={setCurrentNumberOfEntries}
                />
            </table>
            <div className="employees-table-bottom">
                <p>
                    Showing {tableData.length === 0 ? 0 : minIndex + 1} to{' '}
                    {minIndex + currentNumberOfEntries} of {tableData.length}{' '}
                    entries
                </p>
                <div className="employees-table-bottom-buttons-wrapper">
                    <button
                        onClick={previousPage}
                        disabled={previousPageDisabled}
                    >
                        {currentPage - 1}
                    </button>
                    <button onClick={nextPage} disabled={nextPageDisabled}>
                        {currentPage + 1}
                    </button>
                </div>
            </div>
        </main>
    );
}
