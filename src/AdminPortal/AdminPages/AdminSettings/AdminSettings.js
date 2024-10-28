import React, { useState } from "react";
import { Link, useNavigate, Outlet } from "react-router-dom";
import './AdminSettings.css';

const AdminSettings = () => {
    const [selectedSetting, setSelectedSetting] = useState("");
    const navigate = useNavigate();

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSetting(selectedValue);

        // Navigate to the selected setting page
        if (selectedValue) {
            navigate(`${selectedValue}`);
        }
    };

    return (
        <div>
            <h1>Settings</h1>
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
                <option value="advanced">Advanced Settings</option>
            </select>

            <h2>Navigate Directly:</h2>
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
                <li>
                    <Link to="advanced">Advanced Settings</Link>
                </li>
            </ul>

            <Outlet /> {/* This is where the child components will render */}
        </div>
    );
};

export default AdminSettings;