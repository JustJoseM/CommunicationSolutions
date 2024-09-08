import React from "react";
import './AdminNavbar.css';
import logo from '../../Assets/pngwing.com.png';

const AdminNavbar = () => {
    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="admin logo" />
            </div>
            <div className="icons"></div>

        </div>
    )
}

export default AdminNavbar;