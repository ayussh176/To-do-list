import React, { useState } from "react";
import TodoList from "./TodoList";
import NotesSection from "./NotesSection";
import PlannerSection from "./PlannerSection";
import HomePage from "./HomePage";
import { FaSun, FaMoon, FaHome, FaListAlt, FaStickyNote, FaCalendarAlt } from "react-icons/fa";
import "./App.css";

function App() {
    const [darkMode, setDarkMode] = useState(false);
    const [activeSection, setActiveSection] = useState("home");

    // Function to render the active section component
    const renderSection = () => {
        switch (activeSection) {
            case "home":
                return <HomePage setActiveSection={setActiveSection} />;
            case "todo":
                return <TodoList />;
            case "notes":
                return <NotesSection />;
            case "planner":
                return <PlannerSection />;
            default:
                return <HomePage setActiveSection={setActiveSection} />;
        }
    };

    return (
        <div className={darkMode ? "app dark" : "app"}>
            <header>
                <div className="header-left">
                    <h1>ProductivityHub</h1>
                </div>
                <nav className="navbar">
                    <button
                        className={`navbar-button ${activeSection === "home" ? "active" : ""}`}
                        onClick={() => setActiveSection("home")}
                    >
                        <FaHome /> Home
                    </button>
                    <button
                        className={`navbar-button ${activeSection === "todo" ? "active" : ""}`}
                        onClick={() => setActiveSection("todo")}
                    >
                        <FaListAlt /> To-Do List
                    </button>
                    <button
                        className={`navbar-button ${activeSection === "notes" ? "active" : ""}`}
                        onClick={() => setActiveSection("notes")}
                    >
                        <FaStickyNote /> Notes
                    </button>
                    <button
                        className={`navbar-button ${activeSection === "planner" ? "active" : ""}`}
                        onClick={() => setActiveSection("planner")}
                    >
                        <FaCalendarAlt /> Planner
                    </button>
                </nav>
                <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                    {darkMode ? <FaSun /> : <FaMoon />}
                </button>
            </header>
            {renderSection()}
        </div>
    );
}

export default App;