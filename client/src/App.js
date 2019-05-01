import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

//** Original **/
import NavBar from "./components/NavBar/NavBar";
import Search from "./components/Search/Search";
import store from "./store";
import WatchList from "./components/Watchlist/WatchList";
import MainBody from "./components/MainBody/MainBody";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Route
            exact
            path="/"
            render={() => {
              return <Search />;
            }}
          />
          <Route exact path="/watchlist" component={WatchList} />
        </BrowserRouter>
      </Provider>
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
