import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import "../App.css";
const Todo = () => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/todos").then(res => setTask(res.data));
  }, []);

  const markCompleteToggler = index => {
    console.log(index);

    const Task = [...task];
    console.log(Task[index].isCompleted);
    Task[index].isCompleted = !Task[index].isCompleted;
  };

  return (
    <div>
      <Header />
      <div>
        {task.map((task, index) => (
          <div key={task._id}>
            <div style={{ background: "yellow" }}>
              <h4>{task.todo}</h4>
              <h5
                className={task.isCompleted ? "completed" : null}
                onClick={() => markCompleteToggler(index)}
              >
                {task.status}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
