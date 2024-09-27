import React, { useEffect, useRef } from "react";
import './AdminNavbar.css';
import logo from '../../AdminAssets/pngwing.com.png';
import calendar from "../../AdminAssets/alternate-calendar.png";
import apps from "../../AdminAssets/apps.png";
import setting from "../../AdminAssets/cog.png";
import notification from "../../AdminAssets/notification.png";
import user from "../../AdminAssets/characters-kirby.png";

const AdminNavbar = () => {

    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="admin logo" />
                <span>Admin123</span>
            </div>
            <div className="icons">
                <a href="/admin">
                    <img src={calendar} alt="calendar icon"/>
                </a>
                <a href="/admin">
                    <img src={apps} alt="apps icon"/>
                </a>
            </div>
            <div className="notification">
                <a href="/admin">
                    <img src={notification} alt="notification icon"/>
                    <span>1</span>
                </a> 
            </div>
            <div className="user">
                <a href="/admin">
                    <img src={user} alt="user icon" />
                    <span>Admin</span>
                </a>
            </div>
            <div className="settings">
                <a href="/admin">
                    <img src={setting} alt="settings icon" />
                </a>
            </div>
        </div>
    )
}

export default AdminNavbar;