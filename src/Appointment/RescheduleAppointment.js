import React, { useState } from 'react';
import './RescheduleAppointment.css';

const RescheduleAppointment = () => {
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [contact, setContact] = useState('');
  const [reminder, setReminder] = useState('none');

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Appointment rescheduled successfully!');
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Reschedule Appointment</h2>
      <form className="reschedule-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="date">New Date:</label>
          <input
            type="date"
            id="date"
            className="form-input"
            value={appointmentDate}
            onChange={(e) => setAppointmentDate(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="time">New Time:</label>
          <input
            type="time"
            id="time"
            className="form-input"
            value={appointmentTime}
            onChange={(e) => setAppointmentTime(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reason">Reason for Reschedule:</label>
          <select
            id="reason"
            className="form-input"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          >
            <option value="" disabled>Select Reason</option>
            <option value="personal">Personal Conflict</option>
            <option value="work">Work Schedule</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="contact">Contact Information:</label>
          <input
            type="email"
            id="contact"
            className="form-input"
            value={contact}
            onChange={(e) => setContact(e.target.value)}
            placeholder="Enter your email or phone"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reminder">Preferred Reminder:</label>
          <select
            id="reminder"
            className="form-input"
            value={reminder}
            onChange={(e) => setReminder(e.target.value)}
          >
            <option value="none">No Reminder</option>
            <option value="email">Email</option>
            <option value="sms">SMS</option>
          </select>
        </div>
        
        <button type="submit" className="primary-btn">Reschedule</button>
      </form>
    </div>
    
  );
};

export default RescheduleAppointment;
