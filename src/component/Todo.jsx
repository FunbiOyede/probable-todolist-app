import React, { useState, useEffect } from "react";
import axios from "axios";

const Todo = () => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/todos").then(res => setTask(res.data));
  }, []);

  return (
    <div>
      {task.map((task, index) => (
        <div key={task._id}>
          <div style={{ background: "yellow" }}>
            <h4>{task.todo}</h4>
            <h5>{task.status}</h5>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Todo;
