import React from "react";
import { Link } from "react-router-dom";
import Form from "../../components/form/Form";

export default function Home() {
    return(
        <>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                <Link to="/employee-list">View Current Employees</Link>
                <h2>Create Employee</h2>
                <Form />
            </div>
            <div id="confirmation" className="modal">Employee Created!</div>
        </>

    )
}