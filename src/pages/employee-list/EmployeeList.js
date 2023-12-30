import React from "react";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import headers from "../../data/TableHeaders.json";

export default function EmployeeList() {

    return(
        <div id="employee-div" className="container">
            <h1>Current Employees</h1>
            <table id="employee-table" className="display"></table>
            <Link to="/">Home</Link>
            <Table className='employees-table' headers={headers} />
        </div>
    )
}