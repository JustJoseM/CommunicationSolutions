import React from "react";
import { useState } from 'react';
import './Notes.css';
import NoteList from "./NoteList";

const NotesHome = () => {
    const [notes, setNotes] = useState([
        {
        id: `${Date.now()}-${Math.random()}`,
        text: "Company Name: TechGear Solutions Contact Person: Sarah Wilson Marketing Goal: Boost brand visibility and increase product sales for Q4 2024",
        date: "10/02/2023"
        },
    ]);

    const addNote = (text) => {
        const date = new Date();
        const newNotes = {
            id: `${Date.now()}-${Math.random()}`,
            text: text,
            date: date.toLocaleDateString()
        }
        const newNotesList = [...notes, newNotes];
        setNotes(newNotesList);
    }

    const deleteNote =(id) => {
        const NewNotes = notes.filter((note)=> note.id !== id);
        setNotes(NewNotes);
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