import "./Board.css";
import React, { useState } from "react";
import { useBoard } from "../context/BoardContext";
import { useAuth } from "../context/AuthContext";
import { v4 as uuid } from "uuid";
import TaskCard from "../components/TaskCard";


export default function Board() {
  const { state, dispatch } = useBoard();
  const { logout } = useAuth();

  const [search, setSearch] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");

  // ✅ ADD TASK
  const handleAdd = () => {
    const title = prompt("Enter Title");
    if (!title) return alert("Title required");

    const description = prompt("Enter Description") || "";
    const priority =
      prompt("Priority (Low/Medium/High)", "Low") || "Low";
    const dueDate =
      prompt("Due Date (YYYY-MM-DD)") || "";
    const status =
      prompt("Status (Todo/Doing/Done)", "Todo") ||
      "Todo";

    const task = {
      id: uuid(),
      title,
      description,
      priority,
      dueDate,
      status,
      tags: [],
      createdAt: new Date().toISOString(),
    };

    dispatch({ type: "ADD_TASK", payload: task });
  };

  // ✅ EDIT TASK (ONLY ON EDIT BUTTON)
  const handleEdit = (task) => {
    const title = prompt("Edit Title", task.title);
    if (!title) return alert("Title required");

    const description = prompt(
      "Edit Description",
      task.description
    );

    const priority = prompt(
      "Edit Priority (Low/Medium/High)",
      task.priority
    );

    const dueDate = prompt(
      "Edit Due Date (YYYY-MM-DD)",
      task.dueDate
    );

    const status = prompt(
      "Edit Status (Todo/Doing/Done)",
      task.status
    );

    const updatedTask = {
      ...task,
      title,
      description,
      priority,
      dueDate,
      status,
    };

    dispatch({ type: "EDIT_TASK", payload: updatedTask });
  };

  // ✅ FILTER + SEARCH + SORT
  const filtered = state.tasks
    .filter((t) =>
      t.title.toLowerCase().includes(search.toLowerCase())
    )
    .filter(
      (t) => !priorityFilter || t.priority === priorityFilter
    )
    .sort((a, b) => {
      if (!a.dueDate) return 1;
      if (!b.dueDate) return -1;
      return new Date(a.dueDate) - new Date(b.dueDate);
    });

  const columns = ["Todo", "Doing", "Done"];

  return (
  <div className="board-container">
    <h1 className="board-title"><ul>TASK BOARD</ul></h1>

    <div className="top-buttons">
      <button className="logout-btn" onClick={logout}>Logout</button>
      <button className="add-btn" onClick={handleAdd}>Add Task</button>
      <button
        className="reset-btn"
        onClick={() => {
          if (window.confirm("Reset board?")) {
            dispatch({ type: "RESET" });
          }
        }}
      >
        Reset
      </button>
    </div>

    <div className="search-bar">
      <input
        placeholder="Search..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <select
        value={priorityFilter}
        onChange={(e) => setPriorityFilter(e.target.value)}
      >
        <option value="">All</option>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>
    </div>

    <div className="columns">
      {columns.map((col) => (
        <div key={col} className="column">
          <h3>{col}</h3>

          {filtered
            .filter((t) => t.status === col)
            .map((task) => (
              <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
                onDelete={(id) =>
                  dispatch({ type: "DELETE_TASK", payload: id })
                }
              />
            ))}
        </div>
      ))}
    </div>

    <div className="activity-log">
      <h3>Activity Log</h3>
      {state.activityLog.slice(0, 10).map((log, i) => (
        <div key={i}>
          [{log.time}] {log.message}
        </div>
      ))}
    </div>
  </div>
);

}
