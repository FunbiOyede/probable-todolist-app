import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./component/Home";
import Todo from "./component/Todo";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route exact path="/todos" component={Todo} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
