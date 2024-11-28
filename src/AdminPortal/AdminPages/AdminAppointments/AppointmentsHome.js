import React, {useState, useEffect} from "react";
import { db } from '../../../firebaseConfig.js';
import {collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import './AppointmentsHome.css';

/* eslint-disable */
function SchedulingHome() {
    const [appointments, setAppointments] = useState([]);
    const [editingAppointment, setEditingAppointment] = useState(null);
    const [newDate, setNewDate] = useState('');
    const [newTime, setNewTime] = useState('');
  
    // Fetch all appointments from Firestore
    const fetchAppointments = async (db) => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Appointments'));
        const appointmentsList = [];
        querySnapshot.forEach((doc) => {
          appointmentsList.push({ id: doc.id, ...doc.data() });
        });
        setAppointments(appointmentsList);
      } catch (e) {
        console.error('Error fetching appointments:', e);
      }
    };
  
    // Fetch appointments on component mount
    useEffect(() => {
        fetchAppointments(db); 
    }, [db]);

    // Function to handle appointment deletion
    const cancelAppointment = async (id) => {
      try {
        await deleteDoc(doc(db, 'Appointments', id));
        console.log('Appointment cancelled');
        fetchAppointments(db);
      } catch (e) {
        console.error('Error cancelling appointment:', e);
      }
    };
  
    // Function to start rescheduling
    const startReschedule = (appointment) => {
      setEditingAppointment(appointment);
      setNewDate(appointment.date);
      setNewTime(appointment.time);
    };
  
    // Function to reschedule an appointment
    const rescheduleAppointment = async () => {
      if (!editingAppointment) return;
      
      const updatedAppointment = { ...editingAppointment, date: newDate, time: newTime };
  
      try {
        await updateDoc(doc(db, 'Appointments', editingAppointment.id), {
          date: newDate,
          time: newTime,
        });
        console.log('Appointment rescheduled');
        setEditingAppointment(null); 
        fetchAppointments(db);
      } catch (e) {
        console.error('Error rescheduling appointment:', e);
      }
    };
  
    return (
      <div className="manage-appointments">
        <h2>Manage Appointments</h2>
  
        <div className="appointments-list">
          {appointments.length > 0 ? (
            <ul>
              {appointments.map((appointment) => (
                <li key={appointment.id}>
                  <p>Name: {appointment.username}</p>
                  <p>Contact: {appointment.contact}</p>
                  <p>Date: {appointment.date}</p>
                  <p>Time: {appointment.time}</p>
                  <p>Note: {appointment.note}</p>
                  <button className="reschedule-button" onClick={() => startReschedule(appointment)}>Reschedule</button>
                  <button className="cancel-button" onClick={() => cancelAppointment(appointment.id)}>Cancel</button>
                </li>
              ))}
            </ul>
          ) : (
            <p>No appointments found</p>
          )}
        </div>
  
        {editingAppointment && (
          <div className="reschedule-form">
            <h3>Reschedule Appointment</h3>
            <div>
              <label>New Date:</label>
              <input
                type="date"
                value={newDate}
                onChange={(e) => setNewDate(e.target.value)}
                required
              />
            </div>
            <div>
              <label>New Time:</label>
              <input
                type="time"
                value={newTime}
                onChange={(e) => setNewTime(e.target.value)}
                required
              />
            </div>
            <button onClick={rescheduleAppointment}>Save Changes</button>
            <button onClick={() => setEditingAppointment(null)}>Cancel</button>
          </div>
        )}
      </div>
    );
  }
  /* eslint-enable */
  export default SchedulingHome;