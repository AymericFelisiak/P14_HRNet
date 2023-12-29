import React from 'react';
import { IoIosCloseCircle } from "react-icons/io";

export default function Modal({showModal}) {
    return (
        <div className='modal-container'>
            <div className='modal-wrapper'>
                <p>Employee Created!</p>
                <IoIosCloseCircle className="close-button" onClick={(e) => showModal(false)}/>
            </div>
        </div>
    );
}
