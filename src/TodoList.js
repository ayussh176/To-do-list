import React, { useState } from "react";
import TaskItem from "./TaskItem";
import { FaPlus } from "react-icons/fa";
import FilterSort from "./FilterSort"; // Assuming FilterSort will be used

function TodoList() {
    const [tasks, setTasks] = useState([]);
    const [taskText, setTaskText] = useState("");
    const [taskDate, setTaskDate] = useState("");
    const [filter, setFilter] = useState("all"); // State for filter
    const [sort, setSort] = useState("date");   // State for sort

    const addTask = () => {
        if (taskText.trim() === "" || taskDate.trim() === "") return;
        setTasks([...tasks, { id: Date.now(), text: taskText, date: taskDate, completed: false }]);
        setTaskText("");
        setTaskDate("");
    };

    // Filter and sort logic (simplified for demonstration)
    const filteredTasks = tasks.filter(task => {
        if (filter === "completed") return task.completed;
        if (filter === "pending") return !task.completed;
        return true;
    });

    const sortedTasks = [...filteredTasks].sort((a, b) => {
        if (sort === "date") {
            return new Date(a.date) - new Date(b.date);
        }
        if (sort === "name") {
            return a.text.localeCompare(b.text);
        }
        return 0;
    });


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
            {/* You can integrate FilterSort here */}
            {/* <FilterSort setFilter={setFilter} setSort={setSort} /> */}
            <ul>
                {sortedTasks.length === 0 ? (
                    <p style={{ textAlign: 'center', color: 'gray' }}>No tasks yet. Add one above!</p>
                ) : (
                    sortedTasks.map(task => (
                        <TaskItem key={task.id} task={task} setTasks={setTasks} tasks={tasks} />
                    ))
                )}
            </ul>
        </div>
    );
}

export default TodoList;