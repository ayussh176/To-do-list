import React, { useState, useEffect } from "react"; // Import useEffect
import TodoList from "./TodoList";
import Auth from "./Auth";
import HomePage from "./HomePage"; // Import HomePage
import NotesSection from "./NotesSection"; // Import NotesSection
import PlannerSection from "./PlannerSection"; // Import PlannerSection
import { AuthProvider, useAuth } from "./AuthContext";
import { FaSun, FaMoon, FaSignOutAlt } from "react-icons/fa";
import "./App.css";

function AppContent() {
    const { currentUser, logout } = useAuth();
    const [darkMode, setDarkMode] = useState(false);
    // State to manage which section is active: 'home', 'todo', 'notes', 'planner'
    const [activeSection, setActiveSection] = useState("home"); // Default to 'home'

    // Effect to redirect to home page after successful login
    useEffect(() => {
        if (currentUser) {
            setActiveSection("home");
        } else {
            // If user logs out or is not logged in, reset to home or auth
            setActiveSection("home"); // Can also set to 'auth' if you want a blank page before login
        }
    }, [currentUser]); // Run this effect when currentUser changes

    const handleLogout = async () => {
        try {
            await logout();
            setActiveSection("home"); // Go back to home/login page after logout
        } catch (error) {
            console.error("Failed to log out:", error);
            alert("Failed to log out.");
        }
    };

    const renderSection = () => {
        if (!currentUser) {
            return <Auth />; // Show Auth component if no user is logged in
        }

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
                    {currentUser && ( // Only show navigation if logged in
                        <>
                            <button
                                className={`navbar-button ${activeSection === "home" ? "active" : ""}`}
                                onClick={() => setActiveSection("home")}
                            >
                                Home
                            </button>
                            <button
                                className={`navbar-button ${activeSection === "todo" ? "active" : ""}`}
                                onClick={() => setActiveSection("todo")}
                            >
                                To-Do List
                            </button>
                            <button
                                className={`navbar-button ${activeSection === "notes" ? "active" : ""}`}
                                onClick={() => setActiveSection("notes")}
                            >
                                Notes
                            </button>
                            <button
                                className={`navbar-button ${activeSection === "planner" ? "active" : ""}`}
                                onClick={() => setActiveSection("planner")}
                            >
                                Planner
                            </button>
                        </>
                    )}
                </nav>
                <div className="header-right">
                    <button className="theme-toggle" onClick={() => setDarkMode(!darkMode)}>
                        {darkMode ? <FaSun /> : <FaMoon />}
                    </button>
                    {currentUser && ( // Only show logout if logged in
                        <button className="navbar-button" onClick={handleLogout}>
                            <FaSignOutAlt /> Logout
                        </button>
                    )}
                </div>
            </header>
            {renderSection()}
        </div>
    );
}

function App() {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
}

export default App;