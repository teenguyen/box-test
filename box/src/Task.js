import React from "react";
import "./Task.css";

export default function Task({ id, label, completed, onChange, ...props }) {
  return (
    <li className="task-item">
      <input
        id={id}
        className="task-item-checkbox"
        type="checkbox"
        checked={completed}
        onChange={() => onChange(id, completed)}
      />
      <label className="task-item-label" htmlFor={id}>
        {label}
      </label>
    </li>
  );
}
