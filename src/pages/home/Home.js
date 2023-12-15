import React from "react";
import { Link } from "react-router-dom";

export default function Home() {
    return(
        <>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                <Link to="/employee-list">View Current Employees</Link>
                <h2>Create Employee</h2>
                <form action="#" id="create-employee">
                    <label for="first-name">First Name</label>
                    <input type="text" id="first-name" />

                    <label for="last-name">Last Name</label>
                    <input type="text" id="last-name" />

                    <label for="date-of-birth">Date of Birth</label>
                    <input id="date-of-birth" type="text" />

                    <label for="start-date">Start Date</label>
                    <input id="start-date" type="text" />

                    <fieldset className="address">
                        <legend>Address</legend>

                        <label for="street">Street</label>
                        <input id="street" type="text" />

                        <label for="city">City</label>
                        <input id="city" type="text" />

                        <label for="state">State</label>
                        <select name="state" id="state"></select>

                        <label for="zip-code">Zip Code</label>
                        <input id="zip-code" type="number" />
                    </fieldset>

                    <label for="department">Department</label>
                    <select name="department" id="department">
                        <option>Sales</option>
                        <option>Marketing</option>
                        <option>Engineering</option>
                        <option>Human Resources</option>
                        <option>Legal</option>
                    </select>
                </form>

                <button onclick="">Save</button>
            </div>
            <div id="confirmation" className="modal">Employee Created!</div>
        </>

    )
}