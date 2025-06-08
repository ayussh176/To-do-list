import React, { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

function PlannerSection() {
    const [events, setEvents] = useState([]);
    const [eventName, setEventName] = useState("");
    const [eventDateTime, setEventDateTime] = useState("");

    const addEvent = () => {
        if (eventName.trim() === "" || eventDateTime.trim() === "") return;
        const newEvent = {
            id: Date.now(),
            name: eventName,
            dateTime: eventDateTime,
        };
        setEvents([...events, newEvent]);
        setEventName("");
        setEventDateTime("");
    };

    const deleteEvent = (id) => {
        setEvents(events.filter(event => event.id !== id));
    };

    return (
        <div className="planner-container">
            <h2>Your Planner</h2> {/* Added title */}
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
                            <p className="event-date-time">
                                {new Date(event.dateTime).toLocaleString()}
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