import React, { useState } from 'react';
import Form from '../../components/form/Form';
import Modal from '../../components/modal/Modal';

// Page Home which contains the form and the modal.

export default function Home() {
    const [showModal, setShowModal] = useState(false);
    return (
        <>
            <div className="container">
                <h2 className='has-text-centered subtitle is-3'>Create Employee</h2>
                <Form showModal={setShowModal} />
            </div>
            {showModal ? <Modal showModal={setShowModal}/> : <></>}
        </>
    );
}
