import React from 'react';
import '../PagesCSS/AboutUs.css';
import {Link} from 'react-router-dom';

function Navbar() { 
    return (
        <>
            <div className='nav'>
                <div className='title'>
                    <h4>Communication Solutions</h4>
                </div>
                <div className='sample'>
                    <Link to="/schedule">
                        <button className="button">Schedule Appointment</button>
                    </Link>
                </div>
            </div>
        </>
    )
}

export default Navbar