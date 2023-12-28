import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from '../../components/form/Form';
import Modal from '../../components/modal/Modal';

export default function Home() {
    const [showModal, setShowModal] = useState(false);

    return (
        <>
            <div className="title">
                <h1>HRnet</h1>
            </div>
            <div className="container">
                <Link to="/employee-list">View Current Employees</Link>
                <h2>Create Employee</h2>
                <Form showModal={setShowModal} />
            </div>
            {showModal ? <Modal showModal={setShowModal}/> : <></>}
        </>
    );
}
