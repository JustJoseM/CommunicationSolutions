import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { db } from "../../../firebaseConfig";
import { doc, getDoc } from "firebase/firestore";

import './AdminNavbar.css';
import logo from '../../AdminAssets/pngwing.com.png';
import calendar from "../../AdminAssets/alternate-calendar.png";
import apps from "../../AdminAssets/apps.png";
import setting from "../../AdminAssets/cog.png";
import notification from "../../AdminAssets/notification.png";

const NotificationPopup = ({ notifications, onClose}) => {
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
    const [userData, setUserData] = useState(null);

    // Sample notifications
    const [notifications, setNotifications] = useState([
        'Notification 1',
        'Notification 2',
        'Notification 3',
    ]);

    const toggleNotifPopup = () => {
        setPopupVisible(!isPopupVisible);

        // Mark notifications as viewed when the popup is opened
        if(!isPopupVisible) {
            setHasViewedNotifications(true);
        }
    };

    const toggleUserDropdown = () => {
        setShowUserDropdown(!showUserDropdown);
    }

    const toggleSettingsDropdown = () => {
        setShowSettingsDropdown(!showSettingsDropdown);
    }

    // Function to generate random number of notifications
    const generateRandomNotifications = () => {
        const randomCount = Math.floor(Math.random() * 7) + 1; // Generates a number between 1 and 7
        const newNotifications = Array.from({ length: randomCount }, (_, index) => `Notification ${index + 1}`);
        return newNotifications;
    }

    
    useEffect(() => {
        // Read from database
        const fetchUserData = async () => {
            const adminID = "admin1";
            const docRef = doc(db, "Admins", adminID);
            const docSnap = await getDoc(docRef);
            
            if(docSnap.exists()) {
                setUserData(docSnap.data());
            }
            else {
                console.log("No such document");
            }
        };

        fetchUserData();

        // Simulate refreshing notifications every 10 seconds, as an API might
        const interval = setInterval(() => {
            // Generate a random number of notifications
            const randomNotifications = generateRandomNotifications();
            setNotifications(randomNotifications);
            setHasViewedNotifications(false); // Reset the viewed state

        }, 15000); // Refresh every 15 seconds

        return () => clearInterval(interval); // Clean up interval on component unmount
    }, []);

    // Render user data
    const username = userData ? userData.Username: "Loading ...";
    const firstName = userData ? userData.FirstName: "Loading ...";
    const profileImage = userData ? userData.Icon: "";

    return(
        <div className="navbar">
            <div className="logo">
                <img src={logo} alt="admin logo" />
                <span>{username}</span>
            </div>
            <div className="icons">
                <a href="/admin/appointments">
                    <img src={calendar} alt="calendar icon"/>
                </a>
                <a href="/admin">
                    <img src={apps} alt="apps icon"/>
                </a>
            </div>
            <div className="notification" onClick={toggleNotifPopup} role="button" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && toggleNotifPopup()}>
                    <img src={notification} alt="notification icon"/>
                    {/* Only show the notification count if notifications has not been viewed */}
                    {!hasViewedNotifications && notifications.length > 0 && (
                        <span>{notifications.length}</span>
                    )}
                    {isPopupVisible && (
                        <NotificationPopup notifications={notifications} onClose={toggleNotifPopup} />
                )}
            </div>
            <div className="user" onClick={toggleUserDropdown} role="button" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && toggleUserDropdown()}>
                <img src={profileImage} alt="user-icon" />
                <span>{firstName}</span>
                {showUserDropdown && (
                    <div className="user-dropdown">
                        <ul>
                        <li><Link to="/admin/settings/profile">Edit Profile</Link></li>
                            <li>Logout</li> {/* Will later redirect somewhere like /logout */}
                        </ul>
                    </div>
                )}
            </div>
            <div className="settings" onClick={toggleSettingsDropdown} role="button" tabIndex="0" onKeyDown={(e) => e.key === 'Enter' && toggleSettingsDropdown()}>
                <img src={setting} alt="settings icon" />
                {showSettingsDropdown && (
                    <div className="settings-dropdown">
                        <ul>
                            <li><Link to="/admin/settings/profile">Profile Settings</Link></li>
                            <li><Link to="/admin/settings/notifications">Notification Settings</Link></li>
                            <li><Link to="/admin/settings/scheduling">Scheduling Settings</Link></li>
                            <li><Link to="/admin/settings/general">General Settings</Link></li>
                            <li><Link to="/admin/settings/advanced">Advanced Settings</Link></li>
                        </ul>
                    </div>
                )}
            </div>
        </div>
    )
}

export default AdminNavbar;