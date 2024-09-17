import { collection, doc, setDoc, getDoc, query, where, getDocs } from "firebase/firestore";
import { db } from './firebaseConfig'; // Import Firestore instance

// Check if a document exists (used to enforce foreign key relationship)
async function checkDocumentExists(collectionName, docId) {
  const docRef = doc(db, collectionName, docId);
  const docSnap = await getDoc(docRef);
  return docSnap.exists();
}

// Check for unique fields (email, username)
async function checkUniqueField(collectionName, field, value) {
  const q = query(collection(db, collectionName), where(field, "==", value));
  const querySnapshot = await getDocs(q);
  return querySnapshot.empty;  // If empty, the field is unique
}

// Add Admin Document (with not null and unique constraints)
async function addAdmin(adminID, username, email, password) {
  // Check for unique email and username
  const isEmailUnique = await checkUniqueField("Admins", "Email", email);
  const isUsernameUnique = await checkUniqueField("Admins", "Username", username);

  if (!isEmailUnique || !isUsernameUnique) {
    console.error("Error: Email or Username already exists");
    return;
  }

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

// Add Client Document (with not null constraint)
async function addClient(clientID, companyName, photo) {
  if (!companyName) {
    console.error("Error: Company Name is required");
    return;
  }

  try {
    const docRef = await setDoc(doc(db, "Clients", clientID), {
      ClientID: clientID,
      CompanyName: companyName,
      Photo: photo || null,  // Photo can be null
    });
    console.log("Client added with ID: ", clientID);
  } catch (e) {
    console.error("Error adding client: ", e);
  }
}

// Add Account Document (enforcing foreign key to Admin or Client)
async function addAccount(userType, userID, username, email, password) {
  // Check if the related user (Admin/Client) exists
  const userExists = await checkDocumentExists(userType, userID);

  if (!userExists) {
    console.error(`Error: ${userType} with ID ${userID} does not exist`);
    return;
  }

  // Ensure unique email and username within this collection
  const isEmailUnique = await checkUniqueField(`${userType}/${userID}/Accounts`, "Email", email);
  const isUsernameUnique = await checkUniqueField(`${userType}/${userID}/Accounts`, "Username", username);

  if (!isEmailUnique || !isUsernameUnique) {
    console.error("Error: Email or Username already exists");
    return;
  }

  try {
    const docRef = await setDoc(doc(db, `${userType}/${userID}/Accounts`, username), {
      Username: username,
      Email: email,
      Password: password,
    });
    console.log("Account added with username: ", username);
  } catch (e) {
    console.error("Error adding account: ", e);
  }
}

// Add Meeting Document (with foreign key to Client and not null constraint)
async function addMeeting(meetingID, clientID, slot, date, timePeriod) {
  // Check if the client exists (foreign key constraint)
  const clientExists = await checkDocumentExists("Clients", clientID);

  if (!clientExists) {
    console.error(`Error: Client with ID ${clientID} does not exist`);
    return;
  }

  if (!slot || !date || !timePeriod) {
    console.error("Error: Slot, Date, and TimePeriod are required");
    return;
  }

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

// Add Schedule Document (foreign key constraint to Client)
async function addSchedule(clientID, slot) {
  // Check if client exists
  const clientExists = await checkDocumentExists("Clients", clientID);

  if (!clientExists) {
    console.error(`Error: Client with ID ${clientID} does not exist`);
    return;
  }

  if (!slot) {
    console.error("Error: Slot is required");
    return;
  }

  try {
    const docRef = await setDoc(doc(db, "Clients", clientID, "Schedules", slot), {
      Slot: slot,
      ClientID: clientID,
    });
    console.log("Schedule added for client ID: ", clientID);
  } catch (e) {
    console.error("Error adding schedule: ", e);
  }
}

export { addAdmin, addClient, addAccount, addMeeting, addSchedule };
