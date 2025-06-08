import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import { db } from "./firebaseConfig"; // Import db
import { useAuth } from "./AuthContext"; // Import useAuth
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    addDoc,
    updateDoc,
    doc,
    deleteDoc,
    serverTimestamp // Import serverTimestamp
} from "firebase/firestore";

function NotesSection() {
    const { currentUser } = useAuth(); // Get current user
    const [notes, setNotes] = useState([]);
    const [noteTitle, setNoteTitle] = useState("");
    const [noteContent, setNoteContent] = useState("");
    const [editingNoteId, setEditingNoteId] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch notes from Firestore
    useEffect(() => {
        if (!currentUser) {
            setNotes([]); // Clear notes if no user logged in
            setLoading(false);
            return;
        }

        setLoading(true);
        const notesCollectionRef = collection(db, "notes");
        const q = query(
            notesCollectionRef,
            where("userId", "==", currentUser.uid), // Filter by user ID
            orderBy("createdAt", "desc") // Order by creation time
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const notesData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setNotes(notesData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching notes: ", error);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener
    }, [currentUser]);

    const addNote = async () => {
        if (noteTitle.trim() === "" || noteContent.trim() === "" || !currentUser) return;

        try {
            await addDoc(collection(db, "notes"), {
                userId: currentUser.uid, // Store user ID
                title: noteTitle,
                content: noteContent,
                createdAt: serverTimestamp() // Add timestamp
            });
            setNoteTitle("");
            setNoteContent("");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const deleteNote = async (id) => {
        try {
            await deleteDoc(doc(db, "notes", id));
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    const startEditing = (note) => {
        setEditingNoteId(note.id);
        setNoteTitle(note.title);
        setNoteContent(note.content);
    };

    const saveEdit = async () => {
        if (noteTitle.trim() === "" || noteContent.trim() === "" || !currentUser) return;

        try {
            await updateDoc(doc(db, "notes", editingNoteId), {
                title: noteTitle,
                content: noteContent,
                updatedAt: serverTimestamp() // Add an updated timestamp
            });
            setEditingNoteId(null);
            setNoteTitle("");
            setNoteContent("");
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    if (loading) {
        return (
            <div className="notes-container">
                <p style={{ textAlign: 'center', color: 'gray' }}>Loading notes...</p>
            </div>
        );
    }

    return (
        <div className="notes-container">
            <h2>Your Notes</h2>
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
                            {/* Display creation/update time, if available */}
                            {note.createdAt && <span className="note-date">Created: {new Date(note.createdAt.toDate()).toLocaleString()}</span>}
                            {note.updatedAt && <span className="note-date">Updated: {new Date(note.updatedAt.toDate()).toLocaleString()}</span>}
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