import React from "react";
import "./Taskcard.css";

export default function TaskCard({
  task,
  onEdit,
  onDelete,
}) {
  return (
    <div className="task-card">
      <h4>{task.title}</h4>
      <p>{task.description}</p>

      <div className="task-info">
        <span>Priority: {task.priority}</span>
        <span>Due: {task.dueDate || "N/A"}</span>
      </div>

      <div className="task-buttons">
        <button
          className="edit-btn"
          onClick={() => onEdit(task)}
        >
          Edit
        </button>

        <button
          className="delete-btn"
          onClick={() => onDelete(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
