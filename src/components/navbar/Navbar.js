import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

export default function Navbar() {
    const location = useLocation().pathname;

    const isHome = location === '/' ? true : false;

    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h1 className="navbar-item title is-1">HRnet</h1>
            </div>

            <div className="navbar-menu">
                <div className="navbar-end">
                    <div className="navbar-item">
                        <Link
                            className="button is-link is-outlined is-rounded"
                            to={isHome ? '/employee-list' : '/'}
                        >
                            {isHome ? 'View Current Employees' : 'Home'}
                        </Link>
                    </div>
                </div>
            </div>
        </nav>
    );
}