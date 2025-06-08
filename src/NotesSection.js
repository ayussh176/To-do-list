import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

function NotesSection() {
    const [notes, setNotes] = useState([]);
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [editingNoteId, setEditingNoteId] = useState(null);

    const addNote = () => {
        if (noteTitle.trim() === "" || noteContent.trim() === "") return;
        const newNote = {
            id: Date.now(),
            title: noteTitle,
            content: noteContent,
            date: new Date().toLocaleString()
        };
        setNotes([...notes, newNote]);
        setNoteTitle("");
        setNoteContent("");
    };

    const deleteNote = (id) => {
        setNotes(notes.filter(note => note.id !== id));
    };

    const startEditing = (note) => {
        setEditingNoteId(note.id);
        setNoteTitle(note.title);
        setNoteContent(note.content);
    };

    const saveEdit = () => {
        if (noteTitle.trim() === "" || noteContent.trim() === "") return; // Ensure content during edit
        setNotes(notes.map(note =>
            note.id === editingNoteId
                ? { ...note, title: noteTitle, content: noteContent, date: new Date().toLocaleString() }
                : note
        ));
        setEditingNoteId(null);
        setNoteTitle("");
        setNoteContent("");
    };

    return (
        <div className="notes-container">
            <h2>Your Notes</h2> {/* Added title */}
            <div className="notes-input">
                <input
                    type="text"
                    placeholder="Note Title"
                    value={noteTitle}
                    onChange={(e) => setNoteTitle(e.target.value)}
                />
                <textarea
                    placeholder="Write your note here..."
                    value={noteContent}
                    onChange={(e) => setNoteContent(e.target.value)}
                ></textarea>
                {editingNoteId ? (
                    <button onClick={saveEdit}><FaEdit /> Save Edit</button>
                ) : (
                    <button onClick={addNote}><FaPlus /> Add Note</button>
                )}
            </div>
            <div className="notes-list">
                {notes.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'gray' }}>No notes yet. Add one above!</p>
                ) : (
                    notes.map(note => (
                        <div key={note.id} className="note-item">
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                            <span className="note-date">{note.date}</span>
                            <div className="note-actions">
                                <button className="edit" onClick={() => startEditing(note)}><FaEdit /> Edit</button>
                                <button className="delete" onClick={() => deleteNote(note.id)}><FaTrash /> Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default NotesSection;