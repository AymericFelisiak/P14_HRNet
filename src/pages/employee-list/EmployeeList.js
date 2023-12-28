import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Table from "../../components/table/Table";
import headers from "../../data/TableHeaders.json";

export default function EmployeeList() {
    const employees = useSelector((state) => state.employees.user);

    return(
        <div id="employee-div" className="container">
            <h1>Current Employees</h1>
            <table id="employee-table" className="display"></table>
            <Link to="/">Home</Link>
            <Table className='employees-table' headers={headers} data={employees}/>
        </div>
    )
}