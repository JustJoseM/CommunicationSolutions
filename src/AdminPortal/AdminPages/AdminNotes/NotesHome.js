import React, { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { getAuth } from "firebase/auth";
import { db } from '../../../firebaseConfig'
import './Notes.css';
import NoteList from "./NoteList";

const NotesHome = () => {
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


    const addNote = async (text) => {
        if(!adminId) return;
        const date = new Date();
        const newNotes = {
            text,
            date: date.toLocaleDateString()
        }
        const docRef = await addDoc(collection(db, `Admins/${adminId}/Notes`), newNotes);
	    setNotes((prevNotes) => [...prevNotes, { id: docRef.id, ...newNotes }]);
    };

    const deleteNote = async (id) => {
        if(!adminId) return;
        await deleteDoc(doc(db, `Admins/${adminId}/Notes`, id));
        setNotes(notes.filter((note) => note.id !== id));
    }

    return (
        <div className="NotesPage">
            <div className="notes-container">
                <h1>Client Notes</h1>
                <div className="notelist-container">
                    <NoteList 
                        notes={notes} 
                        handleAddNote={addNote}
                        handleDeleteNote={deleteNote}
                    />
                </div>
            </div>
        </div>
    )
}

export default NotesHome;