import React, { useEffect, useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import DropDownMenu from 'p14_dropdownmenu';

export default function Table({ className, headers, data }) {
    const [tableData, setTableData] = useState(data);
    const [showEntries, setShowEntries] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState();
    const [nextPageDisabled, setNextPageDisabled] = useState(false);
    const [previousPageDisabled, setPreviousPageDisabled] = useState(true);
    const [minIndex, setMinIndex] = useState(0);
    const [currentNumberOfEntries, setCurrentNumberOfEntries] = useState(0);

    useEffect(() => {
        const max = data.length / showEntries;
        if (Number.isInteger(max)) {
            setMaxPage(max);
        } else setMaxPage(Math.round(max) + 1);
    }, [setMaxPage, data.length, showEntries, data]);

    const numberEntries = [
        { name: '10' },
        { name: '20' },
        { name: '30' },
        { name: '40' },
        { name: '50' }
    ];

    const nextPage = (e) => {
        const newPage = currentPage + 1;
        setCurrentPage(newPage);
        setPreviousPageDisabled(false);
        if (newPage === maxPage) setNextPageDisabled(true);
    };

    const previousPage = (e) => {
        const newPage = currentPage - 1;
        setCurrentPage(newPage);
        setNextPageDisabled(false);
        if (newPage === 1) setPreviousPageDisabled(true);
        else setPreviousPageDisabled(false);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        const searchValue = e.target.value.toLowerCase().toString();
        if (searchValue.length > 2) {
            const results = data
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
        }
        else setTableData(data);
    };

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
                <TableHeader columns={headers} handleSorting={handleSorting} />
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
                    Showing {minIndex + 1} to {minIndex + currentNumberOfEntries} of{' '}
                    {data.length} entries
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
