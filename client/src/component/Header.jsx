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
          <Link to="/" style={{ color: "white" }}>
            {" "}
            Todos App
          </Link>
          <Typography variant="h6" style={{ marginLeft: "50em" }}>
            <Link to="/todo" style={{ color: "white" }}>
              {" "}
              Todos
            </Link>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Header;
