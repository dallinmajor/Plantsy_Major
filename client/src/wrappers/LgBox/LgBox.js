import React from 'react';
import './LgBox.css';

const LgBox = ({ children, health }) => (
    <div className='lg_box'>
        <div className='cover_top'/>
        <div className='lg_box_buffer'/>
            <div className='center_lg_box'>
                {children}
        </div>
    </div>
);

export default LgBox;