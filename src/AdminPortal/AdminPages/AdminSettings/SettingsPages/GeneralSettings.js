import React, { useState, useEffect } from 'react';
import moment from 'moment-timezone';
import { getAuth } from "firebase/auth";
import { db } from "../../../../firebaseConfig";
import { doc, getDoc, setDoc } from "firebase/firestore";
import "../SettingsPagesCSS/GeneralSettings.css";

const GeneralSettings = () => {
  const [timezones, setTimezones] = useState([]);
  const [DefaultTimezone, setDefaultTimezone] = useState('');
  const [WorkHours, setWorkHours] = useState('');
  const [DateFormat, setDateFormat] = useState('MM/DD/YYYY');
  const [TimeFormat, setTimeFormat] = useState('12-hour');
  const [Language, setLanguage] = useState('English');

  const auth = getAuth();
  const user = auth.currentUser;
  const adminID = user.uid;

  useEffect(() => {
    // Fetch the preferences off Firebase
    const fetchSettings = async () => {
      if(!adminID) return;
      const docRef = doc(db, "Admins", adminID, "Settings", "userPreferences");

      try{
        const docSnap = await getDoc(docRef);
        if(docSnap.exists()) {
          const data = docSnap.data();
          setDefaultTimezone(data.DefaultTimezone);
          setWorkHours(data.WorkHours);
          setDateFormat(data.DateFormat);
          setTimeFormat(data.TimeFormat);
          setLanguage(data.Language);
        }
        else {
          console.log("No such document");
        } 
      } catch(error) {
        console.error("Error fetching document :", error);
      }
    };

    // Get a list of available timezones
    const availableTimezones = moment.tz.names();
    // Create a filtered list of UZ Timezones
    const usTimezones = [
      'America/New_York',
      'America/Chicago',
      'America/Denver',
      'America/Los_Angeles',
      'America/Phoenix',
      'America/Indiana/Indianapolis',
      'America/Indiana/Knox',
      'America/Indiana/Tell_City',
      'America/Detroit',
      'America/Marquette',
      'America/North_Dakota/Center',
      'America/North_Dakota/Beulah',
      'America/Anchorage',
      'America/Adak',
      'Pacific/Honolulu', // Hawaii
      'America/Juneau',   // Alaska
    ];

    // Filter available timezones to show only US timezones
    const filteredTimezones = availableTimezones.filter(zone => usTimezones.includes(zone));
    setTimezones(filteredTimezones);

    // Set default timezone to the first timezone in the list
    if(filteredTimezones.length > 0) {
      setDefaultTimezone(filteredTimezones[0]);
    }

    fetchSettings();
  }, [adminID]);

  const handleTimeZoneChange = (e) => setDefaultTimezone(e.target.value);
  const handleWorkHoursChange = (e) => setWorkHours(e.target.value);
  const handleDateFormatChange = (e) => setDateFormat(e.target.value);
  const handleTimeFormatChange = (e) => setTimeFormat(e.target.value);
  const handleLanguageChange = (e) => setLanguage(e.target.value);

  // Save updated settings to Firebase
  const saveSettings = async () => {
    if(!adminID) return;
    const docRef = doc(db, "Admins", adminID, "Settings", "userPreferences");

    try {
      await setDoc(docRef, {
        DefaultTimezone,
        WorkHours,
        DateFormat,
        TimeFormat,
        Language,
      });
      alert("Settings updated successfully");
    } catch (error) {
      console.error("Error updating document: ", error);
      alert("Filed to update settings.");
    }
  };

  return (
    <div className="general-settings-box">
      <h2 className="general-settings-header-box">General Settings Page</h2>
        <label>
          Default Time Zone:
          <select className="default-timezone" value={DefaultTimezone} onChange={handleTimeZoneChange}>
            {timezones.map((zone) => (
              <option key={zone} value={zone}>
                {zone} ({moment.tz(zone).format('z')})
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Work Hours:
          <input className="work-hours"
            type="text"
            value={WorkHours}
            onChange={handleWorkHoursChange}
            placeholder="e.g., 9AM-5PM"
          />
        </label>
        <br />

        <label>
          Date Format:
          <select className="date-format" value={DateFormat} onChange={handleDateFormatChange}>
            <option value="MM/DD/YYYY">MM/DD/YYYY</option>
            <option value="DD/MM/YYYY">DD/MM/YYYY</option>
            <option value="YYYY/MM/DD">YYYY/MM/DD</option>
          </select>
        </label>
        <br />

        <label>
          Time Format:
          <select className="time-format" value={TimeFormat} onChange={handleTimeFormatChange}>
            <option value="12-hour">12-hour</option>
            <option value="24-hour">24-hour</option>
          </select>
        </label>

        <label>
          Language Preferences:
          <select className="language-preference" value={Language} onChange={handleLanguageChange}>
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </label>
        <br />

        <button className="save-button" onClick={saveSettings}>
          Save Changes
        </button>
      
    </div>
  );
};

export default GeneralSettings;