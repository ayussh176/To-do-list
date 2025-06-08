import React from "react";

function TaskItem({ task, setTasks, tasks }) {
    const toggleComplete = () => {
        setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
    };

    return (
        <li className={task.completed ? "completed" : ""}>
            <input type="checkbox" checked={task.completed} onChange={toggleComplete} />
            <span>{task.text}</span>
            <span className="task-date">{task.date}</span>
        </li>
    );
}

export default TaskItem;
