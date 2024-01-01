import React from 'react';
import { useDispatch } from 'react-redux';
import { addEmployee } from '../../store/EmployeeSlice';
import DropDownMenu from 'p14_dropdownmenu';
import states from '../../data/StateList.json';
import departments from '../../data/DepartmentList.json';

export default function Form({ showModal }) {
    const dispatch = useDispatch();

    const handleAddEmployee = (e) => {
        e.preventDefault();
        const form = new FormData(e.target);
        const data = Object.fromEntries(form.entries());
        dispatch(addEmployee(data));
        showModal(true);
    };

    return (
        <>
            <form
                className="section"
                action="#"
                id="create-employee"
                onSubmit={handleAddEmployee}
            >
                <div className="columns is-8 is-vcentered">
                    <div className="column is-half">
                        <div className="field">
                            <label className="label" htmlFor="first-name">
                                First Name
                            </label>
                            <input
                                className="input"
                                name="first-name"
                                type="text"
                                id="first-name"
                            />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="last-name">
                                Last Name
                            </label>
                            <input
                                className="input"
                                name="last-name"
                                type="text"
                                id="last-name"
                            />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="date-of-birth">
                                Date of Birth
                            </label>
                            <input
                                className="input"
                                name="date-of-birth"
                                id="date-of-birth"
                                type="date"
                            />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="start-date">
                                Start Date
                            </label>
                            <input
                                className="input"
                                name="start-date"
                                id="start-date"
                                type="date"
                            />
                        </div>
                    </div>

                    <div className="column is-half">
                        {/* <legend>Address</legend> */}
                        <div className="field">
                            <label className="label" htmlFor="street">
                                Street
                            </label>
                            <input
                                className="input"
                                name="street"
                                id="street"
                                type="text"
                            />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="city">
                                City
                            </label>
                            <input
                                className="input"
                                name="city"
                                id="city"
                                type="text"
                            />
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="state">
                                State
                            </label>
                            <div className="select is-fullwidth">
                                <DropDownMenu
                                    name="state"
                                    id="state"
                                    className=""
                                    data={states}
                                />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label" htmlFor="zip-code">
                                Zip Code
                            </label>
                            <input
                                className="input"
                                name="zip-code"
                                id="zip-code"
                                type="number"
                            />
                        </div>
                    </div>
                </div>
                <div className="columns is-multiline is-centered is-mobile">
                    <div className="column is-half-tablet is-half-desktop is-full-mobile">
                        <div className="field department">
                            <label className="label" htmlFor="department">
                                Department
                            </label>
                            <div className="select is-fullwidth">
                                <DropDownMenu
                                    name="department"
                                    id="department"
                                    className=""
                                    data={departments}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <div className="columns is-centered is-mobile">
                <button className="button is-success is-light mb-4" form="create-employee">
                    Save
                </button>
            </div>
        </>
    );
}
