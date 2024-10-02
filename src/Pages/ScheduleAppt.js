import React, { useState, useEffect } from 'react';
import '../PagesCSS/ScheduleAppt.css';
import { db } from '../firebaseConfig.js';
import { collection, doc, setDoc, getDoc, query, where, getDocs, addDoc, deleteDoc } from "firebase/firestore";

function ScheduleAppt() {
  // State for form input values
  const [userName, setUserName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    //Get appointments when component mounts
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
      //Add meeting to firestore
      await addDoc(collection(db, 'Meetings'), newAppointment);

      // Reload the list
      showAppointments();

      //Clear the form
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
      const querySnapshot = await getDocs(collection(db, 'Meetings'));
      const appointmentList = [];
      querySnapshot.forEach((doc) => {
        appointmentList.push({ ...doc.data(), id: doc.id})
      });
      setAppointments(appointmentList);
    } catch (error) {
      console.error('Error removing appointment: ', error);
    }
  };

  // Function to remove an appointment from the database
  const removeAppointment = async (id) => {
    try {
      await deleteDoc(doc(db, 'Meetings', id));
      console.log('Appointment removed successfully');
      showAppointments();
    } catch (error) {
      console.error('Error removing appointment: ', error);
    }
  };

  // JSX returned by the component
  return (
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
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found</p>
        )}
      </div>
    </div>
    </div>
  );
}

export default ScheduleAppt;
