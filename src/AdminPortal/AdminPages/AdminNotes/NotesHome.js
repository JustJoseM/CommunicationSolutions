import React from "react";
import { useState, useEffect } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebaseConfig'
import './Notes.css';
import NoteList from "./NoteList";

const NotesHome = () => {
    const [notes, setNotes] = useState([
        // {
        // id: `${Date.now()}-${Math.random()}`,
        // text: "Company Name: TechGear Solutions Contact Person: Sarah Wilson Marketing Goal: Boost brand visibility and increase product sales for Q4 2024",
        // date: "10/02/2023"
        // },
    ]);

	useEffect(() => {
		const fetchNotes = async () => {
            // const adminId = "admin2"
			const querySnapshot = await getDocs(collection(db, 'Admins/admin2/Notes'));
			const fetchedNotes = querySnapshot.docs.map((doc) => ({
				id: doc.id,
				...doc.data(),
			}));
			setNotes(fetchedNotes);
		};

		fetchNotes();
	}, []);


    const addNote = async (text) => {
        const date = new Date();
        const newNotes = {
            text,
            date: date.toLocaleDateString()
        }
        // const adminId = "admin2";
        const docRef = await addDoc(collection(db, "Admins/admin2/Notes"), newNotes);
	    setNotes((prevNotes) => [...prevNotes, { id: docRef.id, ...newNotes }]);
    };

    const deleteNote = async (id) => {
        // const adminId = "admin2";
        await deleteDoc(doc(db, "Admins/admin2/Notes", id));
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