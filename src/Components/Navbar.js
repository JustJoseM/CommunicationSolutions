import React from 'react';
import '../PagesCSS/AboutUs.css';
// import Button from './Button';

function Navbar() {
 
    return (
        <>
            <div className='nav'>
                <div className='title'>
                    <h4>Communication Solutions</h4>
                </div>
                <div className='sample'>
                    <button class="button">Schedule Appointment</button>
                </div>
            </div>
        </>
    )
}

export default Navbar