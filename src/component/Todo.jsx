import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import "../App.css";
const Todo = () => {
  const [task, setTask] = useState([]);
  const [toggleComplete, setToggleComplete] = useState(false);

  useEffect(() => {
    axios.get("http://localhost:5000/todos").then(res => setTask(res.data));
  }, []);

  /**
   *
   * @param {number} index
   * @description deletes task
   */

  const deleteTodo = (index, id) => {
    const Task = [...task];
    Task.splice(index, 1);
    setTask(Task);
    axios
      .delete(`http://localhost:5000/todos/${id}`)
      .then(res => console.log(res));
  };

  /**
   *
   * @param {number} id
   * @description updates task
   */
  const markAsComplete = id => {
    setToggleComplete(toggleComplete === false ? true : false);
    axios
      .put(`http://localhost:5000/todos/${id}`, {
        status: "completed",
        isCompleted: true
      })
      .then(res => console.log(res));
  };
  return (
    <div>
      <Header />
      <div>
        {task.map((task, index) => (
          <div key={task._id}>
            <div style={{ background: "yellow" }}>
              <h4 className={toggleComplete ? "completed" : "none"}>
                {task.todo}
              </h4>
              <button onClick={() => markAsComplete(task._id)}>
                Mark as Completed
              </button>
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
