//                          This is a testing file to test the data


import './App.css';
import React, { useEffect } from 'react';
import { addAdmin, addClient, addAccount, addMeeting, addSchedule } from './firestoreOperations';

function App() {
  useEffect(() => {
    // Testing with data to verify constraints and foreign key relationships

    // Test: Add an Admin (this will succeed)
    addAdmin("admin1", "adminUser", "admin1@example.com", "hashedPassword123");

    // Test: Add an Admin with the same email (this will fail due to unique constraint)
    addAdmin("admin2", "adminUser2", "admin1@example.com", "hashedPassword123");

    // Test: Add a Client (this will succeed)
    addClient("client1", "CompanyXYZ", "https://photo-url.com/client1");

    // Test: Add an Account for Admin (this will succeed)
    addAccount("Admins", "admin1", "adminAccount", "admin_account@example.com", "hashedPassword");

    // Test: Add an Account for a non-existing Admin (this will fail due to foreign key constraint)
    addAccount("Admins", "admin2", "adminAccount", "admin_account2@example.com", "hashedPassword");

    // Test: Add a Meeting (this will succeed)
    addMeeting("meeting1", "client1", "10:00 AM - 11:00 AM", "2024-09-16", "1 hour");

    // Test: Add a Schedule for the Client (this will succeed)
    addSchedule("client1", "2:00 PM - 3:00 PM");

    // Test: Add a Meeting for non-existing Client (this will fail due to foreign key constraint)
    addMeeting("meeting2", "client2", "11:00 AM - 12:00 PM", "2024-09-16", "1 hour");

  }, []);

  return (
    <div className="App">
      <h1>Firebase Firestore</h1>
    </div>
  );
}

export default App;

