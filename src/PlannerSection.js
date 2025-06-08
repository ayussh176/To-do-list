import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";
import { db } from "./firebaseConfig"; // Import db
import { useAuth } from "./AuthContext"; // Import useAuth
import {
    collection,
    query,
    where,
    orderBy,
    onSnapshot,
    addDoc,
    deleteDoc,
    serverTimestamp // Import serverTimestamp
} from "firebase/firestore";

function PlannerSection() {
    const { currentUser } = useAuth(); // Get current user
    const [events, setEvents] = useState([]);
    const [eventName, setEventName] = useState("");
    const [eventDateTime, setEventDateTime] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch events from Firestore
    useEffect(() => {
        if (!currentUser) {
            setEvents([]); // Clear events if no user logged in
            setLoading(false);
            return;
        }

        setLoading(true);
        const eventsCollectionRef = collection(db, "events"); // Use a new collection 'events'
        const q = query(
            eventsCollectionRef,
            where("userId", "==", currentUser.uid), // Filter by user ID
            orderBy("createdAt", "desc") // Order by creation time
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const eventsData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setEvents(eventsData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching events: ", error);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener
    }, [currentUser]);

    const addEvent = async () => {
        if (eventName.trim() === "" || eventDateTime.trim() === "" || !currentUser) return;

        try {
            await addDoc(collection(db, "events"), { // Add to 'events' collection
                userId: currentUser.uid, // Store user ID
                name: eventName,
                dateTime: eventDateTime,
                createdAt: serverTimestamp() // Add timestamp
            });
            setEventName("");
            setEventDateTime("");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const deleteEvent = async (id) => {
        try {
            await deleteDoc(doc(db, "events", id)); // Delete from 'events' collection
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };

    if (loading) {
        return (
            <div className="planner-container">
                <p style={{ textAlign: 'center', color: 'gray' }}>Loading events...</p>
            </div>
        );
    }

    return (
        <div className="planner-container">
            <h2>Your Planner</h2>
            <div className="planner-input">
                <input
                    type="text"
                    placeholder="Event Name"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                />
                <input
                    type="datetime-local"
                    value={eventDateTime}
                    onChange={(e) => setEventDateTime(e.target.value)}
                />
                <button onClick={addEvent}><FaPlus /> Add Event</button>
            </div>
            <div className="planner-list">
                {events.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'gray' }}>No events planned yet. Add one above!</p>
                ) : (
                    events.map(event => (
                        <div key={event.id} className="planner-event">
                            <h3>{event.name}</h3>
                            {event.createdAt && <p className="event-date-time">Created: {new Date(event.createdAt.toDate()).toLocaleString()}</p>}
                            <p className="event-date-time">
                                Event Time: {new Date(event.dateTime).toLocaleString()}
                            </p>
                            <div className="planner-actions">
                                <button className="delete" onClick={() => deleteEvent(event.id)}><FaTrash /> Delete</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default PlannerSection;