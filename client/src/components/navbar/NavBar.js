import React from "react";
import AppBar from "material-ui/AppBar";
import darkBaseTheme from "material-ui/styles/baseThemes/darkBaseTheme";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import Button from "material-ui/FlatButton/FlatButton";
import { Link } from "react-router-dom";

const NavBar = () => (
  <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
    <AppBar title="MoveSquare">
      <Button>
        <Link to="/watchlist">WatchList</Link>
      </Button>
      <Button>
        <Link to="/">Home</Link>
      </Button>
    </AppBar>
  </MuiThemeProvider>
);

function goWatchList() {}

export default NavBar;
