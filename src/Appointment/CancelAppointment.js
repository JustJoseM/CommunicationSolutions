// src/components/CancelAppointment.js
import React, { useState } from 'react';
import './CancelAppointment.css';
import { cancelAppointment } from './appointmentService';

const CancelAppointment = () => {
  const [appointmentID, setAppointmentID] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [confirmPolicy, setConfirmPolicy] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!confirmPolicy) {
      setMessage("Please confirm you agree to the cancellation policy.");
      return;
    }
    try {
      const result = await cancelAppointment(appointmentID, 'userID', cancelReason); // Replace 'userID' with actual user ID if available
      setMessage(result);
    } catch (error) {
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="form-container">
      <h2 className="form-title">Cancel Appointment</h2>
      <form className="cancel-form" onSubmit={handleSubmit}>
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
          <label htmlFor="cancelReason">Reason for Cancellation:</label>
          <select
            id="cancelReason"
            className="form-input"
            value={cancelReason}
            onChange={(e) => setCancelReason(e.target.value)}
            required
          >
            <option value="" disabled>Select Reason</option>
            <option value="conflict">Personal Conflict</option>
            <option value="service">Service Not Needed</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <input
            type="checkbox"
            id="confirmPolicy"
            checked={confirmPolicy}
            onChange={(e) => setConfirmPolicy(e.target.checked)}
          />
          <label htmlFor="confirmPolicy">I agree to the cancellation policy</label>
        </div>
        <button type="submit" className="primary-btn">Cancel Appointment</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CancelAppointment;
