import React, { useState, useEffect } from 'react';
import '../PagesCSS/ScheduleAppt.css';
import { auth, db } from '../../firebaseConfig.js';
import { collection, doc, setDoc, getDoc, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";
import { Helmet } from 'react-helmet';

function ScheduleAppt() {
  // State for form input values
  const [userName, setUserName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [appointments, setAppointments] = useState([]);
  
  // State for rescheduling appointment
  const [rescheduleAppointment, setRescheduleAppointment] = useState(null); // Appointment being rescheduled
  const [newDate, setNewDate] = useState('');
  const [newTime, setNewTime] = useState('');

  useEffect(() => {
    // Get appointments when component mounts
    showAppointments();
  }, []);

  // Function to add a new appointment
  const addAppointment = async (e) => {
    e.preventDefault();

    // Create a new appointment object from form values
    const newAppointment = {
      username: userName,
      contact: contact,
      date: date,
      time: time,
      note: note,
    };

    try {
      // Add meeting to Firestore
      await addDoc(collection(db, 'Appointments'), newAppointment);

      // Reload the list
      showAppointments();

      // Clear the form
      setUserName('');
      setContact('');
      setDate('');
      setTime('');
      setNote('');

      console.log('Appointment added successfully')
    } catch (error) {
      console.error('Error adding appointment: ', error);
    }
  };

  // Function to get meetings in the database
  const showAppointments = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'Appointments'));
      const appointmentList = [];
      querySnapshot.forEach((doc) => {
        const appointmentData = { ...doc.data(), id: doc.id };
        if (appointmentData.contact === auth.currentUser.email) {
          appointmentList.push(appointmentData);
        }
      
      });
      setAppointments(appointmentList);
    } catch (error) {
      console.error('Error getting appointments: ', error);
    }
  };

  // Function to remove an appointment from the database
  const removeAppointment = async (id) => {
    try {
      await deleteDoc(doc(db, 'Appointments', id));
      console.log('Appointment removed successfully');
      showAppointments();
    } catch (error) {
      console.error('Error removing appointment: ', error);
    }
  };

  // Function to reschedule an appointment
  const reschedule = async () => {
    if (newDate && newTime && rescheduleAppointment) {
      try {
        const updatedAppointment = {
          ...rescheduleAppointment,
          date: newDate,
          time: newTime,
        };

        // Update the appointment in Firestore
        await setDoc(doc(db, 'Appointments', rescheduleAppointment.id), updatedAppointment);
        
        // Clear reschedule state
        setRescheduleAppointment(null);
        setNewDate('');
        setNewTime('');
        
        // Reload the appointments
        showAppointments();
        
        console.log('Appointment rescheduled successfully');
      } catch (error) {
        console.error('Error rescheduling appointment: ', error);
      }
    } else {
      console.log('Please select a new date and time');
    }
  };

  // JSX returned by the component
  return (
    <>
      <Helmet>
        <title>Schedule Appointment - Communications Solution</title>
        <meta name="description" content="Schedule an appointment with Communication Solutions for tailored business coaching and strategy sessions. Book your consultation to drive growth and success." />
      </Helmet>

      <div className='appoint_background'>
        <div className="schedule-appt-container">
          <form onSubmit={addAppointment}>
            <div>
              <label>Name:</label>
              <input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} required />
            </div>
            <div>
              <label>Contact:</label>
              <input type="text" value={contact} onChange={(e) => setContact(e.target.value)} required />
            </div>
            <div>
              <label>Date:</label>
              <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required />
            </div>
            <div>
              <label>Time:</label>
              <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required />
            </div>
            <div>
              <label>Note:</label>
              <textarea value={note} onChange={(e) => setNote(e.target.value)} required></textarea>
            </div>
            <button className="submit_button">Add Appointment</button>
          </form>

          {rescheduleAppointment && (
            <div>
              <h3>Reschedule Appointment</h3>
              <p><strong>Name:</strong> {rescheduleAppointment.username}</p>
              <p><strong>Contact:</strong> {rescheduleAppointment.contact}</p>
              <div>
                <label>New Date:</label>
                <input type="date" value={newDate} onChange={(e) => setNewDate(e.target.value)} required />
              </div>
              <div>
                <label>New Time:</label>
                <input type="time" value={newTime} onChange={(e) => setNewTime(e.target.value)} required />
              </div>
              <button onClick={reschedule}>Reschedule</button>
              <button onClick={() => setRescheduleAppointment(null)}>Cancel</button>
            </div>
          )}

          {/* List of appointments */}
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
                    <button onClick={() => removeAppointment(appointment.id)}>Cancel</button>
                    <span> </span>
                    <button onClick={() => setRescheduleAppointment(appointment)}>Reschedule</button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No appointments found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default ScheduleAppt;
