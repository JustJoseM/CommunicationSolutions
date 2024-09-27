import React, { useState, useEffect } from "react";
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
    const [hasViewedNotifications, setHasViewedNotifications] = useState(false);

    // Sample notifications
    const [notifications, setNotifications] = useState([
        'Notification 1',
        'Notification 2',
        'Notification 3',
    ]);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);

        // Mark notifications as viewed when the popup is opened
        if(!isPopupVisible) {
            setHasViewedNotifications(true);
        }
    };

    // Function to generate random number of notifications
    const generateRandomNotifications = () => {
        const randomCount = Math.floor(Math.random() * 7) + 1; // Generates a number between 1 and 7
        const newNotifications = Array.from({ length: randomCount }, (_, index) => `Notification ${index + 1}`);
        return newNotifications;
    }

    // Simulate refreshing notifications every 10 seconds, as an API might
    useEffect(() => {
        const interval = setInterval(() => {
            // Generate a random number of notifications
            const randomNotifications = generateRandomNotifications();
            setNotifications(randomNotifications);
            setHasViewedNotifications(false); // Reset the viewed state

        }, 15000); // Refresh every 15 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

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

                    {/* Only show the notification count if notifications has not been viewed */}
                    {!hasViewedNotifications && notifications.length > 0 && (
                        <span>{notifications.length}</span>
                    )}
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