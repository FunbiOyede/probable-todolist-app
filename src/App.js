import React, { useState } from "react";
import Header from "./component/Header.jsx";
import "./App.css";

function App() {
  const [todos, setTodos] = useState();

  const AddTodo = todo => {
    setTodos(todo);
  };
  return (
    <div className="App">
      <Header />
      <form>
        <input
          type="text"
          name=""
          id=""
          onChange={e => AddTodo(e.target.value)}
        />
      </form>
    </div>
  );
}

export default App;
