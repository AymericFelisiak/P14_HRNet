import React from 'react';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../store/EmployeeSlice';

export default function Form() {
    const [employee, setEmployee] = useState({});

    const dispatch = useDispatch();

    const handleAddEmployee = (e) => {
        e.preventDefault();
        dispatch(addEmployee(employee));
    };

    return (
        <form action="#" id="create-employee" onSubmit={handleAddEmployee}>
            <label htmlFor="first-name">First Name</label>
            <input
                type="text"
                id="first-name"
                onChange={(e) =>
                    setEmployee({ ...employee, firstname: e.target.value })
                }
            />

            <label htmlFor="last-name">Last Name</label>
            <input
                type="text"
                id="last-name"
                onChange={(e) =>
                    setEmployee({ ...employee, lastname: e.target.value })
                }
            />

            <label htmlFor="date-of-birth">Date of Birth</label>
            <input
                id="date-of-birth"
                type="text"
                onChange={(e) =>
                    setEmployee({ ...employee, birthdate: e.target.value })
                }
            />

            <label htmlFor="start-date">Start Date</label>
            <input
                id="start-date"
                type="text"
                onChange={(e) =>
                    setEmployee({ ...employee, startdate: e.target.value })
                }
            />

            <fieldset className="address">
                <legend>Address</legend>

                <label htmlFor="street">Street</label>
                <input
                    id="street"
                    type="text"
                    onChange={(e) =>
                        setEmployee({ ...employee, street: e.target.value })
                    }
                />

                <label htmlFor="city">City</label>
                <input
                    id="city"
                    type="text"
                    onChange={(e) =>
                        setEmployee({ ...employee, city: e.target.value })
                    }
                />

                <label htmlFor="state">State</label>
                <select
                    name="state"
                    id="state"
                    onChange={(e) =>
                        setEmployee({ ...employee, state: e.target.value })
                    }
                ></select>

                <label htmlFor="zip-code">Zip Code</label>
                <input
                    id="zip-code"
                    type="number"
                    onChange={(e) =>
                        setEmployee({
                            ...employee,
                            zipcode: e.target.value
                        })
                    }
                />
            </fieldset>

            <label htmlFor="department">Department</label>
            <select
                name="department"
                id="department"
                onChange={(e) =>
                    setEmployee({ ...employee, department: e.target.value })
                }
            >
                <option>Sales</option>
                <option>Marketing</option>
                <option>Engineering</option>
                <option>Human Resources</option>
                <option>Legal</option>
            </select>
            <button>Save</button>
        </form>
    );
}
