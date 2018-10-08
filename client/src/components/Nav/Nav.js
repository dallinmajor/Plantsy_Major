import React from 'react';
import './Nav.css';

const Nav = (props) => (
    <div className="myNav">
        <ul className="nav nav-pills">
            <li className="nav-item buffer">
                <a id="active" class="nav-link active" href="#">Home</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">About</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Portfolio</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Contact</a>
            </li>
        </ul>
    </div>
);

export default Nav;