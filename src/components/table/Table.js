import React, { useEffect, useState } from 'react';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import DropDownMenu from 'p14_dropdownmenu';
import { useSelector } from 'react-redux';
import Headers from '../../data/TableHeaders.json';

/**
 * Table component.
 * Contains all the logic behind the table :
 * - search function
 * - table sort (when clicking a header)
 * - number of entries the user wants to see
 * - next/previous pages events
 */

export default function Table() {
    const employees = useSelector((state) => state.employees.user);
    const [tableData, setTableData] = useState(employees);
    const [unsortedTable, setUnsortedTable] = useState();
    const [showEntries, setShowEntries] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [maxPage, setMaxPage] = useState();
    const [nextPageDisabled, setNextPageDisabled] = useState(false);
    const [previousPageDisabled, setPreviousPageDisabled] = useState(true);
    const [minIndex, setMinIndex] = useState(0);
    const [currentNumberOfEntries, setCurrentNumberOfEntries] = useState(0);
    const [isSearching, setIsSearching] = useState(false);
    const [sortField, setSortField] = useState('');
    const [sortOrder, setSortOrder] = useState('none');
    const [numberArray, setNumberArray] = useState([]);

    // Defines how many entries must be shown depending on the value selected in the show entries dropdown menu
    useEffect(() => {
        const arr = [...Array(maxPage).keys()];
        setNumberArray(arr);
        if (tableData.length > 0) {
            const max = tableData.length / showEntries;
            if (Number.isInteger(max)) {
                setMaxPage(max);
            } else setMaxPage(Math.round(max) + 1);
        } else setMaxPage(1);
    }, [setMaxPage, showEntries, tableData.length, maxPage]);

    // Options of the show entries dropdown menu
    const numberEntries = [
        { name: '5' },
        { name: '10' },
        { name: '15' },
        { name: '20' },
        { name: '25' }
    ];

    // Disables/Enables next/previous page button depending on which page the user is currently on
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

    /**
     * Resets to first page when users changes show entries value
     */

    useEffect(() => {
        setCurrentPage(1);
    }, [showEntries]);

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

    // Handles the search input
    const handleSearch = (e) => {
        const searchValue = e.target.value.toLowerCase().toString();
        if (searchValue.length > 1) {
            if (currentPage > 1) setCurrentPage(1);
            setIsSearching(true);
            const results = employees
                .map((employee) => {
                    for (let i = 0; i < Headers.length; i++) {
                        const key = Headers[i].key;
                        if (employee[key].toLowerCase().includes(searchValue))
                            return employee;
                    }
                    return undefined;
                })
                .filter((employee) => employee !== undefined);
            setTableData(results);
            setUnsortedTable(results);
        } else if (isSearching) {
            setCurrentPage(1);
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [employees, isSearching, sortField, sortOrder, unsortedTable]);

    return (
        <section className="section px-2">
            <div className="level employees-table-top">
                <div
                    className="level-left entries-options-wrapper"
                    onChange={(e) => setShowEntries(e.target.value)}
                >
                    <label htmlFor="number-entries">Show&nbsp;</label>
                    <div className="select is-small">
                        <DropDownMenu
                            id="number-entries"
                            name="number-entries"
                            className=""
                            data={numberEntries}
                        />
                    </div>
                    &nbsp;entries
                </div>
                <div className="level-right search">
                    <label htmlFor="search">Search:&nbsp;</label>
                    <input
                        data-testid="search-input"
                        className="input is-small"
                        name="search"
                        id="search"
                        type="text"
                        onChange={handleSearch}
                    />
                </div>
            </div>
            <div className="table-container">
                <table
                    data-testid="table"
                    className="table is-striped is-hoverable is-fullwidth"
                >
                    <TableHeader
                        columns={Headers}
                        sortField={sortField}
                        setSortField={setSortField}
                        sortOrder={sortOrder}
                        setSortOrder={setSortOrder}
                    />
                    <TableBody
                        columns={Headers}
                        data={tableData}
                        numberEntries={showEntries}
                        currentPage={currentPage}
                        setMinIndex={setMinIndex}
                        setCurrentNumberOfEntries={setCurrentNumberOfEntries}
                    />
                </table>
            </div>

            <div className="level">
                <p className="level-left">
                    Showing {tableData.length === 0 ? 0 : minIndex + 1} to{' '}
                    {minIndex + currentNumberOfEntries} of {tableData.length}{' '}
                    entries
                </p>
                <div className="level-right pagination is-small">
                    <ul className="pagination-list">
                        <li>
                            <button
                                className="pagination-link"
                                onClick={previousPage}
                                disabled={previousPageDisabled}
                            >
                                Previous
                            </button>
                        </li>
                        {numberArray.map((number, key) => {
                            return (
                                <li>
                                    <button className={currentPage === number + 1 ? "pagination-link is-current" : 'pagination-link'} onClick={(e) => setCurrentPage(number + 1)}>
                                        {number + 1}
                                    </button>
                                </li>
                            );
                        })}
                        <li>
                            <button
                                className="pagination-link"
                                onClick={nextPage}
                                disabled={nextPageDisabled}
                            >
                                Next
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    );
}
