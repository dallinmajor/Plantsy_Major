import React from 'react';
import './LgBox.css';

const LgBox = ({ children }) => (
    <div className='lg_box'>
        <div className='cover_top'>
        <div className='lg_box_buffer'/>
            <div className='center_lg_box'>
                <div className='inner_box'>
                    {children}
                </div>
            </div>
        </div>
    </div>
);

export default LgBox;