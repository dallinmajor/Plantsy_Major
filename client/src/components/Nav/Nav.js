import React from 'react';
import './Nav.css';

const Nav = () => (

    <div className="myNav">
        <div className='plantsy-nav-color'>
            <div className='nav-buffer'></div>
            <div className="title">Plantsy  </div>
            <div href='/create' className='plantsy-nav-link'>Home</div>
            <div href='/create' className='plantsy-nav-link'>Feed</div>
            <div href='/create' className='plantsy-nav-link'>Profile</div>
        </div>
    </div>
);

export default Nav;