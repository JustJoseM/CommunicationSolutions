import React, { useEffect, useState } from "react";
import { db } from "../../../firebaseConfig.js";
import { getDocs, collection } from "firebase/firestore";
import "./AppointBox.css";

const AppointmentBox = () => {
    const [appointments, setAppointments] = useState([]);
  
    // Fetch all appointments from Firestore
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "Appointments"));
        const appointmentsList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setAppointments(appointmentsList);
      } catch (e) {
        console.error("Error fetching appointments:", e);
      }
    };

  // Fetch appointments on component mount
  useEffect(() => {
    fetchAppointments();
  }, []);

  return (
    <div className="appointment-box">
      <h2>Appointments</h2>
      <div className="appointments-box-list">
        {appointments.length > 0 ? (
          <ul>
            {appointments.map((appointment) => (
              <li key={appointment.id} className="appointment-item">
                <p>Name: {appointment.username}</p>
                <p>Contact: {appointment.contact}</p>
                <p>Date: {appointment.date}</p>
                <p>Time: {appointment.time}</p>
                <p>Note: {appointment.note}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No appointments found</p>
        )}
      </div>
    </div>
  );
};

export default AppointmentBox;