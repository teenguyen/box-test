import React, { useEffect, useState } from "react";
import Task from "./Task";
import "./App.css";

const ENDPOINT = "http://localhost:9898/todo/tasks";

function App() {
  let [inputValue, setInputValue] = useState("");
  let [tasks, setTasks] = useState([]);

  const getTasks = () => {
    fetch(ENDPOINT, { method: "GET" })
      .then(response => response.json())
      .then(tasks => {
        setTasks(tasks);
      });
  };

  const addTask = () => {
    if (inputValue !== "") {
      const body = JSON.stringify({ label: inputValue, completed: false });
      fetch(`${ENDPOINT}/create`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": body.length
        },
        body
      }).then(() => {
        setInputValue("");
        getTasks();
      });
    }
  };

  const editTask = (id, completed) => {
    const body = JSON.stringify({ completed: !completed });
    fetch(`${ENDPOINT}/${id}/edit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": body.length
      },
      body
    }).then(getTasks());
  };

  useEffect(getTasks, []);

  return (
    <div className="App">
      <header>
        <img
          id="box-company-logo"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Box%2C_Inc._logo.svg/1280px-Box%2C_Inc._logo.svg.png"
          alt="box company logo"
        />
      </header>
      <main className="add-task">
        <label className="add-task-label" htmlFor="add-task-input">
          Enter a task:
        </label>
        <input
          id="add-task-input"
          className="add-task-input"
          placeholder="What do you have to do?"
          value={inputValue}
          onChange={e => setInputValue(e.target.value)}
          onKeyDown={e => e.key === "Enter" && addTask()}
        />
        <span className="button-wrapper">
          <button className="add-task-button" onClick={addTask}>
            Add
          </button>
        </span>
        <ul className="task-list">
          {tasks.map(task => (
            <Task key={task.id} onChange={editTask} {...task} />
          ))}
        </ul>
      </main>
    </div>
  );
}

export default App;
