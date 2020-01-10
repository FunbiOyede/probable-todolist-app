import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">MernStack</Typography>
          <Typography variant="h6" style={{ marginLeft: "50em" }}>
            TodosApp
            <Link to="/todos"> Todos</Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
