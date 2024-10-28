import React, { useState } from 'react';
import './CancelAppointment.css';

const CancelAppointment = () => {
  const [appointmentID, setAppointmentID] = useState('');
  const [cancelReason, setCancelReason] = useState('');
  const [confirmPolicy, setConfirmPolicy] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!confirmPolicy) {
      alert("Please confirm you agree to the cancellation policy.");
      return;
    }
    alert('Appointment cancelled successfully!');
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
          
          
        </div>
        <button type="submit" className="primary-btn">Cancel Appointment</button>
      </form>
    </div>
  );
};

export default CancelAppointment;
