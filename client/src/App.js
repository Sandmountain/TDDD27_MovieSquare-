import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";

//** Original **/
import NavBar from "./components/NavBar/NavBar";
import Search from "./components/Search/Search";
import store from "./store";
import WatchList from "./components/Watchlist/WatchList";
import LoginPage from "./components/LoginPage";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Route
            path="/"
            exact
            render={() => {
              return (
                <div>
                  <Search />
                </div>
              );
            }}
          />
          <Route path="/watchlist" exact component={WatchList} />
          <Route path="/loginpage" exact component={LoginPage} />
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
