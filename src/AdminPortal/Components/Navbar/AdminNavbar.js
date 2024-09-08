import React from "react";
import './AdminNavbar.css';
import logo from '../../Assets/pngwing.com.png';
import search from "../../Assets/search.png";
import calendar from "../../Assets/alternate-calendar.png";
import apps from "../../Assets/apps.png";
import setting from "../../Assets/cog.png";
import notification from "../../Assets/notification.png";
import user from "../../Assets/characters-kirby.png";

const AdminNavbar = () => {
    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="admin logo" />
                <span>admin</span>
            </div>
            <div className="icons">
                <img src={search} alt="search icon"/>
                <img src={calendar} alt="calendar icon"/>
                <img src={apps} alt="apps icon"/>
            </div>
            <div className="notification">
                <img src={notification} alt="notification icon"/>
                <span>1</span>
            </div>
            <div className="user">
                <img src={user} alt="user icon"/>
                <span>Admin</span>
            </div>
            <div className="settings">
                <img src={setting} alt="settings icon"/>
            </div>

        </div>
    )
}

export default AdminNavbar;