import React, { useState, useEffect } from "react";
import TaskItem from "./TaskItem";
import { FaPlus } from "react-icons/fa";
import { db } from "./firebaseConfig"; // Import db from firebaseConfig
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

function TodoList() {
    const { currentUser } = useAuth(); // Get current user from AuthContext
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [loading, setLoading] = useState(true);

    // Fetch tasks from Firestore when component mounts or currentUser changes
    useEffect(() => {
        if (!currentUser) {
            setTasks([]); // Clear tasks if no user is logged in
            setLoading(false);
            return;
        }

        setLoading(true);
        const tasksCollectionRef = collection(db, "tasks");
        const q = query(
            tasksCollectionRef,
            where("userId", "==", currentUser.uid), // Filter tasks by current user's ID
            orderBy("createdAt", "desc") // Order by creation time
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            const tasksData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));
            setTasks(tasksData);
            setLoading(false);
        }, (error) => {
            console.error("Error fetching tasks: ", error);
            setLoading(false);
        });

        return () => unsubscribe(); // Cleanup listener on unmount
    }, [currentUser]);

    const addTask = async () => {
        if (taskText.trim() === "" || taskDate.trim() === "" || !currentUser) return;

        try {
            await addDoc(collection(db, "tasks"), {
                userId: currentUser.uid, // Store the user's ID with the task
                text: taskText,
                date: taskDate,
                completed: false,
                createdAt: serverTimestamp() // Add a timestamp for ordering
            });
            setTaskText("");
            setTaskDate("");
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    };

    const toggleComplete = async (taskId, completedStatus) => {
        const taskDocRef = doc(db, "tasks", taskId);
        try {
            await updateDoc(taskDocRef, {
                completed: !completedStatus
            });
        } catch (e) {
            console.error("Error updating document: ", e);
        }
    };

    const deleteTask = async (taskId) => {
        const taskDocRef = doc(db, "tasks", taskId);
        try {
            await deleteDoc(taskDocRef);
        } catch (e) {
            console.error("Error deleting document: ", e);
        }
    };


    if (loading) {
        return (
            <div className="todo-container">
                <p style={{ textAlign: 'center', color: 'gray' }}>Loading tasks...</p>
            </div>
        );
    }

    return (
        <div className="todo-container">
            <h2>To-Do List</h2>
            <div className="task-input">
                <input
                    type="text"
                    placeholder="New task..."
                    value={taskText}
                    onChange={(e) => setTaskText(e.target.value)}
                />
                <input
                    type="date"
                    value={taskDate}
                    onChange={(e) => setTaskDate(e.target.value)}
                />
                <button onClick={addTask}><FaPlus /> Add Task</button>
            </div>
            <ul>
                {tasks.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'gray' }}>No tasks yet. Add one above!</p>
                ) : (
                    tasks.map(task => (
                        <TaskItem
                            key={task.id}
                            task={task}
                            onToggleComplete={toggleComplete} // Pass toggleComplete as a prop
                            onDeleteTask={deleteTask}       // Pass onDeleteTask as a prop
                        />
                    ))
                )}
            </ul>
        </div>
    );
}

export default TodoList;