import React from "react";
import { FaListAlt, FaStickyNote, FaCalendarAlt, FaPlus } from "react-icons/fa";

function HomePage({ setActiveSection }) { // Accepts setActiveSection as a prop
    return (
        <div className="home-container">
            <section className="welcome-section">
                <h2>Welcome to ProductivityHub</h2>
                <p>
                    Your all-in-one productivity companion. Manage tasks, capture notes, and
                    plan your schedule seamlessly.
                </p>
            </section>

            <section className="feature-cards-grid">
                <div className="feature-card">
                    <FaListAlt className="icon" />
                    <h3>Todo List</h3>
                    <p>Organize and track your daily tasks efficiently.</p>
                    <button onClick={() => setActiveSection("todo")}>Get Started</button>
                </div>

                <div className="feature-card">
                    <FaStickyNote className="icon" />
                    <h3>Notes</h3>
                    <p>Capture your thoughts and ideas in one place.</p>
                    <button onClick={() => setActiveSection("notes")}>Get Started</button>
                </div>

                <div className="feature-card">
                    <FaCalendarAlt className="icon" />
                    <h3>Planner</h3>
                    <p>Schedule and plan your upcoming events.</p>
                    <button onClick={() => setActiveSection("planner")}>Get Started</button>
                </div>
            </section>

            <section className="call-to-action-section">
                <h3>Ready to boost your productivity?</h3>
                <p>Start by creating your first task, note, or event.</p>
                <div className="cta-buttons">
                    <button onClick={() => setActiveSection("todo")}>
                        <FaPlus /> Add Task
                    </button>
                    <button onClick={() => setActiveSection("notes")}>
                        <FaPlus /> Create Note
                    </button>
                </div>
            </section>
        </div>
    );
}

export default HomePage;