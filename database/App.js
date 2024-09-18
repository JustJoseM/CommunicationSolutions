//                          This is a testing file to test the data


import './App.css';
import React, { useEffect } from 'react';
import { addAdmin, addClient, addAccount, addMeeting, addSchedule } from './firestoreOperations';

function App() {
  useEffect(() => {
    // Testing with data to verify constraints and foreign key relationships and valid entries to register into db

    // Test: Add an Admin (this will succeed)
    addAdmin("Ted Cruz", "TCruz", "TCruz@gmail.com", "4everRepub");

    // Test: Add an Admin with the same email (this will fail due to unique constraint)
    addAdmin("Ted Cruz", "TCruz", "TCruz@gmail.com", "4everRepub");

    // Test: Add a Client (this will succeed)
    addClient("Jeff Bezos", "Amazon", "https://photo-url.com/client1");

    // Test: Add an Account for Admin (this will succeed)
    addAdmin("Donald Trump", "DTrump", "DTrump.com", "trumpster222");

    // Test: Add an Account for a non-existing Admin (this will fail due to foreign key constraint)
    addAccount("Admins", "Joe Biden", "JBiden", "JBiden@example.com", "golfmaster345");

    // Test: Add a Meeting (this will succeed)
    addMeeting("Client Meeting", "Jeff Bezos", "10:00 AM - 11:00 AM", "2024-09-16", "1 hour");

    // Test: Add a Schedule for the Client (this will succeed)
    addSchedule("Ted Cruz", "2:00 PM - 3:00 PM");

    // Test: Add a Meeting for non-existing Client (this will fail due to foreign key constraint)
    addMeeting("Urgent Discussion", "Hunter Biden", "11:00 AM - 12:00 PM", "2024-09-16", "1 hour");

  }, []);

  return (
    <div className="App">
      <h1>Firebase Firestore</h1>
    </div>
  );
}

export default App;

