import React, { useState } from "react";
import "./App.css";

function App() {
  // Store tasks in an array of objects
  const [tasks, setTasks] = useState([
    { id: 1, description: "Learn React", completed: false },
    { id: 2, description: "Build a task Tracker", completed: false },
    { id: 3, description: "Deploy the App", completed: true },
  ]);

  const [newTask, setNewTask] = useState("");

  // Add new task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() === "") return;

    const task = {
      id: Date.now(), // Simple way to generate unique IDs
      description: newTask,
      completed: false,
    };

    setTasks([...tasks, task]);
    setNewTask("");
  };

  // Toggle task completion status
  const toggleTask = (id) => {
    const updatedTasks = tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task,
    );

    // Sort tasks: incomplete first, then complete
    const sortedTasks = [...updatedTasks].sort((a, b) => {
      if (a.completed === b.completed) return 0;
      return a.completed ? 1 : -1;
    });

    setTasks(sortedTasks);
  };

  // Delete tasks
  const deleteTask = (id) => {
    const filteredTasks = tasks.filter((task) => task.id !== id);
    setTasks(filteredTasks);
  };

  // Render tasks based on current state
  const renderTasks = () => {
    return tasks.map((task) => (
      <div
        key={task.id}
        className={`task-item ${task.completed ? "completed" : ""}`}
      >
        <input
          type="
          checkbox"
          checked={task.completed}
          onChange={() => toggleTask(task.id)}
        />
        <span className="task-description">{task.description}</span>
        <button className="delete-btn" onClick={() => deleteTask(task.id)}>
          Delete
        </button>
      </div>
    ));
  };
  return (
    <div className="App">
      <h1> Task Tracker </h1>

      {/* Add Task Form */}
      <form onSubmit={addTask} className="add-task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task..."
        />
        <button type="submit">Add Task</button>
      </form>

      {/* Tasks List */}
      <div className="tasks-container">
        {tasks.length === 0 ? (
          <p className="no-tasks">No tasks yet. Add one above!</p>
        ) : (
          renderTasks()
        )}
      </div>

      {/* Task Statistics */}
      <div className="task-stats">
        <p>Total tasks: {tasks.length}</p>
        <p>Completed: {tasks.filter((t) => t.completed).length}</p>
        <p>Pending: {tasks.filter((t) => !t.completed).length}</p>
      </div>
    </div>
  );
}

export default App;
