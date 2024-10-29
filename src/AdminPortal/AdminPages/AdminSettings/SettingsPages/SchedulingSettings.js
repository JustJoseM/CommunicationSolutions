import React, { useEffect, useState } from 'react';
import moment from 'moment-timezone';

const SchedulingOptions = () => {
  const [timezones, setTimezones] = useState([]);

  useEffect(() => {
    // Get a list of available timezones
    const availableTimezones = moment.tz.names();
    setTimezones(availableTimezones);
  }, []);

  return(
    <div className="scheduling-settings">
      <h2>Scheduling Settings</h2>

      {/* Section for General Scheduling settings */}
      <section className="general-scheduling-settings">
        <label>
          Default Appointment Type:
          <select>
            <option value="meeting">Meeting</option>
            <option value="consultation">Consultation</option>
            <option value="follow-up">Follow Up</option>
          </select>
        </label>

        <label>
          <input type="checkbox" /> Enable Recurring Appointments
        </label>

        <label>
          <input type="checkbox" /> Require Confirmation from Participant
        </label>
        
        {/* Cancellation Policy */}
        <label>
          Cancellation Policy (Notice Required):
          <select>
            <option value="none">None</option>
            <option value="24">24 hours</option>
            <option value="48">48 hours</option>
            <option value="72">72 hours</option>
          </select>
        </label>

        <label>
          Default Appointment Duration:
          <select>
            <option value="15">15 minutes</option>
            <option value="30">30 minutes</option>
            <option value="60">1 hour</option>
          </select>
        </label>

        <label>
          Default Location:
          <select>
            <option value="zoom">Zoom</option>
            <option value="teams">Microsoft Teams</option>
            <option value="in-person">In-Person</option>
          </select>
        </label>
      </section>

      {/* Section for Notification Preferences regarding Appointments */}
      <section className="scheduling-notification-settings">
        <h3>Appointment Notification Preferences</h3>
        <label>
          <input type="checkbox" /> Enable Reminder Notifications
        </label>

        <label>
          Reminder Time:
          <select>
            <option value="10">10 minutes before</option>
            <option value="15">15 minutes before</option>
            <option value="30">30 minutes before</option>
            <option value="60">1 hour before</option>
          </select>
        </label>

        <label>
          <input type="checkbox" />Notify Participants of Changes
        </label>
      </section>
      {/* Set available hours */}
    </div>
  )
};

export default SchedulingOptions;