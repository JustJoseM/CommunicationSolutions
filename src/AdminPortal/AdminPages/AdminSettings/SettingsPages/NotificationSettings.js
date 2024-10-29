import React, { useState, useEffect } from "react";
import { db } from "../../../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../SettingsPagesCSS/NotificationSettings.css";

const NotificationSettings = () => {

  // State to manage notification preferences
  const [notifications, setNotifications] = useState({
    Push: false,
    Email: false,
    SMS: false,
    Sound: false,
  });

  const fetchNotificationSettings = async () => {
    const adminID = "admin2";
    const docRef = doc(db, "Admins", adminID, "Settings", "notificationSettings");
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      setNotifications(docSnap.data());
    }
    else {
      console.log("No such document");
    }
  };

  // Function to update notification settings
  const updateNotificationSettings = async () => {
    const adminID = "admin2";
    const docRef = doc(db, "Admins", adminID, "Settings", "notificationSettings");

    try {
      await setDoc(docRef, notifications);
      alert("Settings updated successfully.");
    } catch(error) {
      console.error("Error updating document: ", error);
      alert("Failed to update settings.");
    }
  };

  useEffect(() => {
    fetchNotificationSettings();
  }, []);

  // Function to handle checkbox changes
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
            name="Push"
            checked={notifications.Push}
            onChange={handleChange}
          />
          Push Notifications
        </label>
        <label>
          <input
            type="checkbox"
            name="Email"
            checked={notifications.Email}
            onChange={handleChange}
          />
          Email Notifications
        </label>
        <label>
          <input
            type="checkbox"
            name="SMS"
            checked={notifications.SMS}
            onChange={handleChange}
          />
          SMS Notifications
        </label>
        <label>
          <input
            type="checkbox"
            name="Sound"
            checked={notifications.Sound}
            onChange={handleChange}
          />
          Enable Sound
        </label>
      </div>

      <button className="save-button" onClick={updateNotificationSettings}>
        Save Changes
      </button>
    </div>
  );
};

export default NotificationSettings;
