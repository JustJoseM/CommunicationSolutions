import React, { useState } from "react";
import { Link, useNavigate, Outlet, useLocation } from "react-router-dom";
import './AdminSettings.css';

const AdminSettings = () => {
    const [selectedSetting, setSelectedSetting] = useState("");
    const navigate = useNavigate();
    const currentLocation = useLocation();

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSetting(selectedValue);

        // Navigate to the selected setting page
        if (selectedValue) {
            navigate(`${selectedValue}`);
        }
    };

    // Determine if on main settings page
    const isMainSettingsPage = currentLocation.pathname === "/admin/settings";

    return (
        <div className="box-container">
            <div className="settings-container">
            <h1 className="settings-header">Settings</h1>
            <div className="dropdown-container">
                <label htmlFor="settings-dropdown">Select a setting to change:</label>
                <select
                    id="settings-dropdown"
                    value={selectedSetting}
                    onChange={handleDropdownChange}
                >
                    <option value="">-- Choose an option --</option>
                    <option value="profile">Profile Settings</option>
                    <option value="notifications">Notification Settings</option>
                    <option value="scheduling">Scheduling Settings</option>
                    <option value="general">General Settings</option>
                </select>
            </div>

            {/* Direct Navigation options are only available on main settings page */}
            {isMainSettingsPage && (
                <div className="manual-selection">
                    <h2 className="nav-header-container">Navigate Directly:</h2>
                    <ul>
                        <li>
                            <Link to="profile">Profile Settings</Link>
                        </li>
                        <li>
                            <Link to="notifications">Notification Settings</Link>
                        </li>
                        <li>
                            <Link to="scheduling">Scheduling Settings</Link>
                        </li>
                        <li>
                            <Link to="general">General Settings</Link>
                        </li>
                    </ul>
                </div>
            )}
            <Outlet />
            </div>
        </div>
    );
};

export default AdminSettings;