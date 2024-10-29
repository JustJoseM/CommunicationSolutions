import React, { useState } from 'react';
import "../SettingsPagesCSS/NotificationSettings.css";

const NotificationSettings = () => {

  // State to manage notification preferences
  const [notifications, setNotifications] = useState({
    push: false,
    email: false,
    sms: false,
    sound: false,
  });

  const handleChange = (event) => {
    const { name, type, checked } = event.target;
    setNotifications((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : event.target.value,
    }));
  };

  return (
    <div className="notification-settings">
      <h2 className="notification-settings-header">Notification Settings</h2>
      <div className="settings-section">
        <h3 className="notification-types">Notification Types</h3>
        <label>
          <input
            type="checkbox"
            name="push"
            checked={notifications.push}
            onChange={handleChange}
          />
          Push Notifications
        </label>
        <label>
          <input
            type="checkbox"
            name="email"
            checked={notifications.email}
            onChange={handleChange}
          />
          Email Notifications
        </label>
        <label>
          <input
            type="checkbox"
            name="sms"
            checked={notifications.sms}
            onChange={handleChange}
          />
          SMS Notifications
        </label>
        <label>
          <input
            type="checkbox"
            name="sound"
            checked={notifications.sound}
            onChange={handleChange}
          />
          Enable Sound
        </label>
      </div>

      <button className="save-button">Save Changes</button>
    </div>
  );
};

export default NotificationSettings;
