import React, { useState } from "react";
import './AdminNavbar.css';
import logo from '../../AdminAssets/pngwing.com.png';
import calendar from "../../AdminAssets/alternate-calendar.png";
import apps from "../../AdminAssets/apps.png";
import setting from "../../AdminAssets/cog.png";
import notification from "../../AdminAssets/notification.png";
import user from "../../AdminAssets/characters-kirby.png";

const NotificationPopup = ({ notifications, onClose}) => {
    return (
        <div className="notification-popup">
            <button onClick={onClose}>Close</button>
            <ul>
                {notifications.map((notif, index) => (
                    <li key={index}>{notif}</li>
                ))}
            </ul>
        </div>
    );
};

const AdminNavbar = () => {
    const [isPopupVisible, setPopupVisible] = useState(false);

    // Sample notifications
    const notifications = [
        'Notification 1',
        'Notification 2',
        'Notification 3',
        'Notification 4',
        'Notification 5',
        'Notification 6',
        'Notification 7',
    ];

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    }

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
            <div className="notification" onClick={togglePopup} role="button" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && togglePopup()}>
                    <img src={notification} alt="notification icon"/>
                    <span>{notifications.length}</span>
                {isPopupVisible && (
                    <NotificationPopup notifications={notifications} onClose={togglePopup} />
                )}
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