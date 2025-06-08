import React from "react";
import { FaTrash } from "react-icons/fa"; // Import FaTrash icon

function TaskItem({ task, onToggleComplete, onDeleteTask }) {
    return (
        <li className={task.completed ? "completed" : ""}>
            <input
                type="checkbox"
                checked={task.completed}
                onChange={() => onToggleComplete(task.id, task.completed)}
            />
            <span>{task.text}</span>
            <span className="task-date">{task.date}</span>
            <button
                className="delete-task-button" // Add a class for styling
                onClick={() => onDeleteTask(task.id)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#dc3545', fontSize: '1.1rem', marginLeft: '15px' }}
            >
                <FaTrash />
            </button>
        </li>
    );
}

export default TaskItem;