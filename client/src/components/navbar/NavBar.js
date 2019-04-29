import React from "react";
import AppBar from "material-ui/AppBar";
import Button from "material-ui/FlatButton/FlatButton";
import { Link } from "react-router-dom";

const NavBar = () => (
  <AppBar title="MoveSquare">
    <Button>
      <Link to="/watchlist">WatchList</Link>
    </Button>
    <Button>
      <Link to="/">Home</Link>
    </Button>
  </AppBar>
);

function goWatchList() {}

export default NavBar;
