import React, { Component } from "react";
import NavBar from "./components/navbar/NavBar";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import Search from "./components/search/Search";

/* OLD UI
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";

import AppNavbar from "./components/AppNavbar";
import MainBody from "./components/MainBody";
import Collage from "./components/Collage";

library.add(faStroopwafel);
*/
class App extends Component {
  render() {
    return (
      <MuiThemeProvider>
        <div>
          <NavBar />
          <Search />
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;

/* Old app.js
          <div className="app">
          <AppNavbar />
        <Container>
          <Collage />
          <MainBody />
        </Container>
        </div>
    */
