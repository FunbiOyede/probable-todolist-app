import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";

const TodoForm = props => {
  const [todo, setTodo] = useState();
  /**
   * @description add new task
   */
  const AddTodo = e => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/todos", {
        task: todo
      })
      .then(res => console.log(res));
    props.history.push("/todos");
  };

  return (
    <div>
      <form>
        <input
          type="text"
          name=""
          id=""
          onChange={e => setTodo(e.target.value)}
        />

        <button onClick={e => AddTodo(e)}>Add</button>
      </form>
    </div>
  );
};

export default withRouter(TodoForm);
