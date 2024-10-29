import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import './AdminNavbar.css';
import logo from '../../AdminAssets/pngwing.com.png';
import calendar from "../../AdminAssets/alternate-calendar.png";
import apps from "../../AdminAssets/apps.png";
import setting from "../../AdminAssets/cog.png";
import notification from "../../AdminAssets/notification.png";
import user from "../../AdminAssets/characters-kirby.png";

const NotificationPopup = ({ notifications, onClose }) => {
    return (
        <div className="notification-popup">
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
    const [hasViewedNotifications, setHasViewedNotifications] = useState(false);
    const [showUserDropdown, setShowUserDropdown] = useState(false);
    const [showSettingsDropdown, setShowSettingsDropdown] = useState(false);
    const [notifications, setNotifications] = useState([
        'Notification 1',
        'Notification 2',
        'Notification 3',
    ]);

    const navigate = useNavigate();

    const toggleNotifPopup = () => {
        setPopupVisible(!isPopupVisible);
        if (!isPopupVisible) {
            setHasViewedNotifications(true);
        }
    };

    const toggleUserDropdown = () => {
        setShowUserDropdown(!showUserDropdown);
    };

    const toggleSettingsDropdown = () => {
        setShowSettingsDropdown(!showSettingsDropdown);
    };

    const generateRandomNotifications = () => {
        const randomCount = Math.floor(Math.random() * 7) + 1;
        return Array.from({ length: randomCount }, (_, index) => `Notification ${index + 1}`);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            const randomNotifications = generateRandomNotifications();
            setNotifications(randomNotifications);
            setHasViewedNotifications(false);
        }, 15000);

        return () => clearInterval(interval);
    }, []);

    const handleLogout = () => {
        navigate("/signin");
    };

    return (
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="admin logo" />
                <span>Admin123</span>
            </div>
            <div className="icons">
                <a href="/admin/schedule">
                    <img src={calendar} alt="calendar icon" />
                </a>
                <a href="/admin">
                    <img src={apps} alt="apps icon" />
                </a>
            </div>
            <div className="notification" onClick={toggleNotifPopup} role="button" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && toggleNotifPopup()}>
                <img src={notification} alt="notification icon" />
                {!hasViewedNotifications && notifications.length > 0 && (
                    <span>{notifications.length}</span>
                )}
                {isPopupVisible && (
                    <NotificationPopup notifications={notifications} onClose={toggleNotifPopup} />
                )}
            </div>
            <div className="user" onClick={toggleUserDropdown} role="button" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && toggleUserDropdown()}>
                <img src={user} alt="user icon" />
                <span>Admin</span>
                {showUserDropdown && (
                    <div className="user-dropdown">
                        <ul>
                            <li>Edit Profile</li>
                            <li onClick={handleLogout}>Logout</li>
                        </ul>
                    </div>
                )}
            </div>
            <div className="settings" onClick={toggleSettingsDropdown} role="button" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && toggleSettingsDropdown()}>
                <img src={setting} alt="settings icon" />
                {showSettingsDropdown && (
                    <div className="settings-dropdown">
                        <ul>
                            <li>Profile Settings</li>
                            <li>Notification Settings</li>
                            <li>Scheduling Options</li>
                            <li>General Settings</li>
                            <li>Advanced Settings</li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminNavbar;
