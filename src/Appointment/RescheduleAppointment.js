// src/components/RescheduleAppointment.js
import React, { useState } from 'react';
import './RescheduleAppointment.css';
import { rescheduleAppointment } from './appointmentService';

const RescheduleAppointment = () => {
  const [appointmentID, setAppointmentID] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');
  const [appointmentTime, setAppointmentTime] = useState('');
  const [reason, setReason] = useState('');
  const [contact, setContact] = useState('');
  const [reminder, setReminder] = useState('none');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newDateTime = `${appointmentDate}T${appointmentTime}`;
      const result = await rescheduleAppointment(appointmentID, 'userID', newDateTime); // Replace 'userID' with actual user ID if available
      setMessage(result);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Reschedule Appointment</h2>
      <form className="reschedule-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="appointmentID">Appointment ID:</label>
          <input
            type="text"
            id="appointmentID"
            className="form-input"
            value={appointmentID}
            onChange={(e) => setAppointmentID(e.target.value)}
            required
          />
        </div>
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
      {message && <p>{message}</p>}
    </div>
  );
};

export default RescheduleAppointment;
