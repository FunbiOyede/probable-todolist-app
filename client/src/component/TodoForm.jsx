import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import axios from "axios";
import { Container, Form, Button } from "react-bootstrap";

const TodoForm = props => {
  const [todo, setTodo] = useState();
  /**
   * @description add new task
   */
  const AddTodo = e => {
    e.preventDefault();
    axios
      .post("api/todos", {
        task: todo
      })
      .then(res => res);

    setTimeout(() => {
      props.history.push("/todo");
    }, 100);
  };

  return (
    <div>
      <Container>
        <Form style={{ marginTop: "30px" }}>
          <Form.Group controlId="formBasicEmail">
            <Form.Label> Add Todo</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter Todo"
              onChange={e => setTodo(e.target.value)}
            />
          </Form.Group>

          <Button variant="primary" type="submit" onClick={e => AddTodo(e)}>
            Submit
          </Button>
        </Form>
      </Container>
    </div>
  );
};

export default withRouter(TodoForm);
