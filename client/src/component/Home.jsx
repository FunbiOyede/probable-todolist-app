import React from "react";
import TodoForm from "./TodoForm";
import Header from "./Header";

const Home = () => {
  return (
    <div>
      <Header />
      <div>
        <TodoForm />
      </div>
    </div>
  );
};

export default Home;
