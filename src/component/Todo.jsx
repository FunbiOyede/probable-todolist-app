import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import "../App.css";
const Todo = () => {
  const [task, setTask] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/todos").then(res => setTask(res.data));
  }, []);

  /**
   *
   * @param {number} index
   * @description deletes task
   */

  const deleteTodo = (index, id) => {
    console.log(id);
    console.log(index);
    const Task = [...task];
    Task.splice(index, 1);
    setTask(Task);
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(res => console.log(res));
  };
  return (
    <div>
      <Header />
      <div>
        {task.map((task, index) => (
          <div key={task._id}>
            <div style={{ background: "yellow" }}>
              <h4>{task.todo}</h4>
              <h5>{task.status}</h5>
              <button onClick={() => deleteTodo(index, task._id)}>
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Todo;
