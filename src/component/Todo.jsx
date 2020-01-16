import React, { useState, useEffect } from "react";
import Header from "./Header";
import axios from "axios";
import "../App.css";
import { Button, Container, Card } from "react-bootstrap";
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
      <Container>
        <div>
          {task.map((task, index) => (
            <Card key={task._id} style={{ marginTop: "30px" }}>
              <Card.Body>
                <h4 className={toggleComplete ? "completed" : "none"}>
                  {task.todo}
                </h4>
                <Button
                  onClick={() => markAsComplete(task._id)}
                  style={{ marginRight: "10px" }}
                >
                  Mark as Completed
                </Button>
                <Button
                  variant="danger"
                  onClick={() => deleteTodo(index, task._id)}
                >
                  Delete
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Todo;
