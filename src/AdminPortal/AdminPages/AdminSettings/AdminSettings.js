import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import './AdminSettings.css';

const AdminSettings = () => {
    const [selectedSetting, setSelectedSetting] = useState("");
    const navigate = useNavigate();

    const handleDropdownChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedSetting(selectedValue);

        // Navigate to the selected setting page
        if(selectedValue) {
            navigate(selectedValue);
        }
    };

    return (
        <div>
            <h1>Settings </h1>
            <label htmlFor="settings-dropdown">Select a setting to change:</label>
            <select
                id="settings-dropdown"
                value={selectedSetting}
                onChange={handleDropdownChange}
            >
                <option value="">-- Choose an option --</option>
                <option value="/admin/settings/profile">Profile Settings</option>
                <option value="/admin/settings/notifications">Notification Settings</option>
                <option value="/admin/settings/scheduling">Scheduling Settings</option>
                <option value="/admin/settings/general">General Settings</option>
                <option value="/admin/settings/advanced">Advanced Settings</option>
            </select>

            <h2>Navigate Directly:</h2>
            <ul>
                <li>
                    <Link to="/admin/settings/profile">Profile Settings</Link>
                </li>
                <li>
                    <Link to="/admin/settings/notifications">Notification Settings</Link>
                </li>
                <li>
                    <Link to="/admin/settings/scheduling">Scheduling Settings</Link>
                </li>
                <li>
                    <Link to="/admin/settings/general">General Settings</Link>
                </li>
                <li>
                    <Link to="/admin/settings/advanced">Advanced Settings</Link>
                </li>
            </ul>
        </div>
    )
};

export default AdminSettings;