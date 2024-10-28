import React from "react";
import { useState } from 'react';
import './Notes.css';

const NewNote = ({ handleAddNote }) => {

    const [noteText, setNoteText] = useState('');
    const charLimit = 500;

    const handleChange = (event) =>{
        if(charLimit - event.target.value.length >= 0){
            setNoteText(event.target.value);
        }
    } 

    const handleSaveClick = () => {
        if(noteText.trim().length > 0){
            handleAddNote(noteText);
            setNoteText('');
        }
    }

    return (
        <div className="note new">
            <textarea
                rows="8"
                cols="10"
                placeholder="Type a new note here..."
                value={noteText}
                onChange={handleChange}
            ></textarea>
            <div className="note-footer">
                <small>{charLimit - noteText.length} Remaining</small>
                <button className="save" onClick={handleSaveClick}>Save</button>
            </div>
        </div>
    )
}

export default NewNote;