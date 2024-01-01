import React from 'react';
import Table from '../../components/table/Table';
import headers from '../../data/TableHeaders.json';

// Page EmployeeList which contains the table.

export default function EmployeeList() {
    return (
        <div className="container">
            <h2 className='has-text-centered subtitle is-3'>Current Employees</h2>
            <Table headers={headers} />
        </div>
    );
}
