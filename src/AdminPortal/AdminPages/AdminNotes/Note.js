import React from "react";
import './Notes.css';

const Note = ({ id, text, date, handleDeleteNote}) => {
    return (
        <div className="note">
            <span>{text}</span>
            <div className="note-footer">
                <small>{date}</small>
                <button className="delete-button" onClick={()=> handleDeleteNote(id)}>Delete</button>
            </div>
        </div>
    )
}

export default Note;