import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { FaPlus } from "react-icons/fa";

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
    const [taskDate, setTaskDate] = useState("");

    const addTask = () => {
        if (taskText.trim() === "" || taskDate.trim() === "") return;
        setTasks([...tasks, { id: Date.now(), text: taskText, date: taskDate, completed: false }]);
        setTaskText("");
        setTaskDate("");
    };

    return (
        <div className="todo-container">
            <h2>To-Do List</h2> {/* Added title */}
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
                        <TaskItem key={task.id} task={task} setTasks={setTasks} tasks={tasks} />
                    ))
                )}
            </ul>
        </div>
    );
}

export default TodoList;