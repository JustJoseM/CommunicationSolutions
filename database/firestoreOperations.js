import { collection, doc, setDoc, addDoc } from "firebase/firestore";
import { db } from './firebaseConfig'; // Import Firestore instance

// Add Admin Document
async function addAdmin(adminID, username, email, password) {
  try {
    const docRef = await setDoc(doc(db, "Admins", adminID), {
      AdminID: adminID,
      Username: username,
      Email: email,
      Password: password,
    });
    console.log("Admin added with ID: ", adminID);
  } catch (e) {
    console.error("Error adding admin: ", e);
  }
}

// Add Client Document
async function addClient(clientID, companyName, photo) {
  try {
    const docRef = await setDoc(doc(db, "Clients", clientID), {
      ClientID: clientID,
      CompanyName: companyName,
      Photo: photo,
    });
    console.log("Client added with ID: ", clientID);
  } catch (e) {
    console.error("Error adding client: ", e);
  }
}

// Add Account Document (for both Admin and Client)
async function addAccount(collectionName, userID, username, email, password) {
  try {
    const docRef = await setDoc(doc(db, collectionName, userID, "Accounts", username), {
      Username: username,
      Email: email,
      Password: password,
    });
    console.log("Account added to " + collectionName + " with username: ", username);
  } catch (e) {
    console.error("Error adding account: ", e);
  }
}

// Add Meeting Document
async function addMeeting(meetingID, clientID, slot, date, timePeriod) {
  try {
    const docRef = await setDoc(doc(db, "Meetings", meetingID), {
      ClientID: clientID,
      Slot: slot,
      Date: date,
      TimePeriod: timePeriod,
    });
    console.log("Meeting added with ID: ", meetingID);
  } catch (e) {
    console.error("Error adding meeting: ", e);
  }
}

// Add Schedule Document (under Client)
async function addSchedule(clientID, slot) {
  try {
    const docRef = await setDoc(doc(db, "Clients", clientID, "Schedules", slot), {
      Slot: slot,
      ClientID: clientID,
    });
    console.log("Schedule added to client with ID: ", clientID);
  } catch (e) {
    console.error("Error adding schedule: ", e);
  }
}

export { addAdmin, addClient, addAccount, addMeeting, addSchedule };
