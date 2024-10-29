import React, { useEffect, useState } from 'react';
import { db } from "../../../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../SettingsPagesCSS/SchedulingSettings.css";

const SchedulingOptions = () => {
  const [settings, setSettings] = useState({
    DefaultApptType: '',
    DefaultDuration: '',
    DefaultType: '',
    AppointmentReminder: false,
    RecurringMeetings: false,
    ConfirmationRequirement: false,
    CancellationTime: '',
    ReminderTime: '',
    NotifyChanges: false,
  });


  // Fetch the preferences off Firebase
  const fetchSettings = async () => {
    const adminID = "admin2";
    const docRef = doc(db, "Admins", adminID, "Settings", "schedulingPreferences");
    const docSnap = await getDoc(docRef);

    if(docSnap.exists()) {
      setSettings(docSnap.data());
    }
    else {
      console.log("No such document");
    }
  };

  // Function to update scheduling settings
  const updateSchedulingSettings = async () => {
    const adminID = "admin2";
    const docRef = doc(db, "Admins", adminID, "Settings", "schedulingPreferences");

    try {
      await setDoc(docRef, settings);
      alert("Settings updated successfully.");
    } catch(error) {
      console.error("Error updating document: ", error);
      alert("Failed to update settings.");
    }
  }

  const handleChange = (event) => {
    const { name, type, checked } = event.target;
    setSettings((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : event.target.value,
    }));
  };

  useEffect(() =>{
    fetchSettings();
  }, [])

  return(
    <div className="scheduling-settings">
      <h2 className="scheduling-settings-header">Scheduling Settings</h2>

      {/* Section for General Scheduling settings */}
      <section className="general-scheduling-settings">
        <h2 className="general-settings">General Scheduling Settings</h2>
        <label>
          Default Appointment Type:
          <select className="default-apt-select" name="DefaultApptType" value={settings.DefaultApptType} onChange={handleChange}>
            <option value="meeting">Meeting</option>
            <option value="consultation">Consultation</option>
            <option value="follow-up">Follow Up</option>
          </select>
        </label>

        <label>
          <input type="checkbox" name="RecurringMeetings" checked={settings.RecurringMeetings} onChange={handleChange} /> 
          Enable Recurring Appointments
        </label>

        <label>
          <input type="checkbox" name="ConfirmationRequirement" checked={settings.ConfirmationRequirement} onChange={handleChange} /> 
          Require Confirmation from Participant
        </label>
        
        {/* Cancellation Policy */}
        <label>
          Cancellation Policy (Notice Required):
          <select className= "cancellation-policy" name="CancellationTime" value={settings.CancellationTime} onChange={handleChange}>
            <option value="0">None</option>
            <option value="24">24 hours</option>
            <option value="48">48 hours</option>
            <option value="72">72 hours</option>
          </select>
        </label>

        <label>
          Default Appointment Duration:
          <select className="default-duration" name="DefaultDuration" value={settings.DefaultDuration} onChange={handleChange}>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </label>

        <label>
          Default Meeting Type:
          <select className="default-meeting-type" name="DefaultType" value={settings.DefaultType} onChange={handleChange}>
            <option value="zoom">Zoom</option>
            <option value="teams">Microsoft Teams</option>
            <option value="in-person">In-Person</option>
          </select>
        </label>
      </section>

      {/* Section for Notification Preferences regarding Appointments */}
      <section className="scheduling-notification-settings">
        <h3 className="apt-notif-prefs">Appointment Notification Preferences</h3>
        <label>
          <input type="checkbox" name="NotifyChanges" checked={settings.NotifyChanges} onChange={handleChange} />Notify Participants of Changes
        </label>
        <label>
          <input type="checkbox" name="AppointmentReminder" checked={settings.AppointmentReminder} onChange={handleChange}/>
          Enable Reminder Notifications
        </label>

        <label>
          Reminder Time:
          <select className="reminder-time" name="ReminderTime" value={settings.ReminderTime} onChange={handleChange}>
            <option value="0">None</option>
            <option value="5">5 minutes before</option>
            <option value="15">15 minutes before</option>
            <option value="30">30 minutes before</option>
            <option value="60">1 hour before</option>
          </select>
        </label>
      </section>

      {/* Save Button */}
      <button className="save-button" onClick={updateSchedulingSettings}>
        Save Changes
      </button>
    </div>
  )
};

export default SchedulingOptions;