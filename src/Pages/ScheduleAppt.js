import React, { useState, useEffect } from 'react';
import '../PagesCSS/ScheduleAppt.css';

function ScheduleAppt() {
  // State for form input values
  const [userName, setUserName] = useState('');
  const [contact, setContact] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [note, setNote] = useState('');
  const [appointments, setAppointments] = useState([]);
  const [db, setDb] = useState(null);

  useEffect(() => {
    // Create and open the IndexedDB database
    const request = window.indexedDB.open('appointments', 1);

    // Handle any errors in opening the database
    request.onerror = () => {
      console.log('Database failed to open');
    };

    // Success handler when the database opens
    request.onsuccess = () => {
      setDb(request.result);
      showAppointments(request.result);
    };

    request.onupgradeneeded = (e) => {
      const db = e.target.result;
      const objectStore = db.createObjectStore('appointments', { keyPath: 'key', autoIncrement: true });

      // Create indexes for queying data later
      objectStore.createIndex('username', 'username', { unique: false });
      objectStore.createIndex('contact', 'contact', { unique: false });
      objectStore.createIndex('date', 'date', { unique: false });
      objectStore.createIndex('time', 'time', { unique: false });
      objectStore.createIndex('note', 'note', { unique: false });

      console.log('Database setup complete');
    };
  }, []);

  // Function to add a new appointment
  const addAppointment = (e) => {
    e.preventDefault();

    // Create a new appointment object from form values
    const newAppointment = {
      username: userName,
      contact: contact,
      date: date,
      time: time,
      note: note,
    };

    // Begin a new transaction to write to the appointments object store
    const transaction = db.transaction(['appointments'], 'readwrite');
    const objectStore = transaction.objectStore('appointments');
    const request = objectStore.add(newAppointment);

    // When the addition is successful, clear the form inputs
    request.onsuccess = () => {
      setUserName('');
      setContact('');
      setDate('');
      setTime('');
      setNote('');
    };

    // Once the transaction completes, reload the list of appointments
    transaction.oncomplete = () => {
      console.log('Appointment added');
      showAppointments(db);
    };

    // Handle any error that occurs during the transaction
    transaction.onerror = () => {
      console.log('Error adding appointment');
    };
  };

  // Function to show all appointments in the database
  const showAppointments = (db) => {
    const objectStore = db.transaction('appointments').objectStore('appointments');
    const appointmentsList = [];

    // Open a cursor to iterate through all the appointments
    objectStore.openCursor().onsuccess = (e) => {
      const cursor = e.target.result;
      if (cursor) {
        appointmentsList.push(cursor.value);
        cursor.continue();
      } else {
        setAppointments(appointmentsList);
      }
    };
  };

  // Function to remove an appointment from the database
  const removeAppointment = (key) => {
    const transaction = db.transaction(['appointments'], 'readwrite');
    const objectStore = transaction.objectStore('appointments');
    objectStore.delete(key);

    // Once the deletion is complete, reload the list of appointments
    transaction.oncomplete = () => {
      console.log('Appointment removed');
      showAppointments(db);
    };
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
              <li key={appointment.key}>
                <p>Name: {appointment.username}</p>
                <p>Contact: {appointment.contact}</p>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <p>Note: {appointment.note}</p>
                <button onClick={() => removeAppointment(appointment.key)}>Cancel</button>
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
