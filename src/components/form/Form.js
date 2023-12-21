import React from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../store/EmployeeSlice';
import DropDownMenu  from 'p14_dropdownmenu';
import states from '../../data/StateList.json';
import departments from '../../data/DepartmentList.json';

export default function Form() {

    const dispatch = useDispatch();

    const handleAddEmployee = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        dispatch(addEmployee(data));
    };

    return (
        <form action="#" id="create-employee" onSubmit={handleAddEmployee}>
            <label htmlFor="first-name">First Name</label>
            <input name="first-name" type="text" id="first-name" />

            <label htmlFor="last-name">Last Name</label>
            <input name="last-name" type="text" id="last-name" />

            <label htmlFor="date-of-birth">Date of Birth</label>
            <input name="date-of-birth" id="date-of-birth" type="date" />

            <label htmlFor="start-date">Start Date</label>
            <input name="start-date" id="start-date" type="date" />

            <fieldset className="address">
                <legend>Address</legend>

                <label htmlFor="street">Street</label>
                <input name="street" id="street" type="text" />

                <label htmlFor="city">City</label>
                <input name="city" id="city" type="text" />

                <label htmlFor="state">State</label>
                <DropDownMenu
                    name="state"
                    id="state"
                    className=""
                    data={states}
                />

                <label htmlFor="zip-code">Zip Code</label>
                <input name="zip-code" id="zip-code" type="number" />
            </fieldset>

            <label htmlFor="department">Department</label>
            <DropDownMenu
                name="department"
                id="department"
                className=""
                data={departments}
            />
            <button>Save</button>
        </form>
    );
}
