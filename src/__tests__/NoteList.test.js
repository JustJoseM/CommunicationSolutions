import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import NoteList from '../AdminPortal/AdminPages/AdminNotes/NoteList';
import Note from '../AdminPortal/AdminPages/AdminNotes/Note';
import NewNote from '../AdminPortal/AdminPages/AdminNotes/NewNote';

//mocks the Note component for NoteList
jest.mock('../AdminPortal/AdminPages/AdminNotes/Note', () => ({ id, text, date, handleDeleteNote }) => (
    <div data-testid="note">
        <span>{text}</span>
        <small>{date}</small>
        <button onClick={() => handleDeleteNote(id)}>Delete</button>
    </div>
));
//Mocks the NewNote for NoteList
jest.mock('../AdminPortal/AdminPages/AdminNotes/NewNote', () => ({ handleAddNote }) => (
    <div data-testid="new-note">
        <button onClick={() => handleAddNote('New note')}>save</button>
    </div>
));


const mockHandleAddNote = jest.fn();
const mockHandleDeleteNote = jest.fn();
//Sample notes 
const sampleNotes = [
    { id: '1', text: 'First note', date: '2024-11-10' },
    { id: '2', text: 'Second note', date: '2024-11-11' },
];
//resets for each test
beforeEach(() => {
    render(
        <NoteList 
            notes={sampleNotes} 
            handleAddNote={mockHandleAddNote} 
            handleDeleteNote={mockHandleDeleteNote} 
        />
    );
});
//Rendering
test('renders the correct number of Note components', () => {
    const notes = screen.getAllByTestId('note');
    expect(notes).toHaveLength(sampleNotes.length);
});

test('renders NewNote component', () => {
    expect(screen.getByTestId('new-note')).toBeInTheDocument();
});
//Handles the Delete and Save functions
test('calls handleAddNote when NewNote Save button is clicked', () => {
    const addButton = screen.getByText('save');
    fireEvent.click(addButton);
    expect(mockHandleAddNote).toHaveBeenCalledWith('New note');
});

test('calls handleDeleteNote when Note Delete button is clicked', () => {
    const deleteButtons = screen.getAllByText('Delete');
    fireEvent.click(deleteButtons[0]);
    expect(mockHandleDeleteNote).toHaveBeenCalledWith('1');
});
