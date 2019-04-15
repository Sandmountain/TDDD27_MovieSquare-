import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Container } from "reactstrap";
import { library } from "@fortawesome/fontawesome-svg-core";
import { faStroopwafel } from "@fortawesome/free-solid-svg-icons";

import AppNavbar from "./components/AppNavbar";
import MainBody from "./components/MainBody";
import Collage from "./components/Collage";

library.add(faStroopwafel);

class App extends Component {
  render() {
    return (
      <div className="app">
        <AppNavbar />
        <Container>
          <Collage />
          <MainBody />
        </Container>
      </div>
    );
  }
}

export default App;
