import React, { useState, useEffect } from "react";
import { collection, getDocs} from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { db } from '../../../firebaseConfig'
import "../../AdminPages/AdminNotes/Notes.css";
import Note from "../../AdminPages/AdminNotes/Note.js";
import "../../AdminPages/AdminNotes/Notes.css";

const NotesBox = () => {
const [notes, setNotes] = useState([ ]);

const auth = getAuth();
const user = auth.currentUser;
const adminId =  user.uid;

useEffect(() => {
    const fetchNotes = async () => {
        if (!adminId) return;
        const querySnapshot = await getDocs(collection(db, `Admins/${adminId}/Notes`));
        const fetchedNotes = querySnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
        }));
        setNotes(fetchedNotes);
    };

    fetchNotes();
}, [adminId]);


return (
    <div className="clientHoldingBox">
        <h1>Notes</h1>
        <div className="notes-list">
            {notes.slice(0,2).map((note) => (
                <Note 
                    id={note.id} 
                    text={note.text} 
                    date={note.date} 
                    showDeleteButton={false}
                />
            ))}
        </div>
    </div>
)
};

export default NotesBox;