import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import "./App.css";

//** Original **/
import NavBar from "./components/Navbar/NavBar";
import Search from "./components/Search/Search";
import store from "./store";
import WatchList from "./components/Watchlist/WatchList";
import LoginPage from "./components/Login/LoginPage";
import SearchPage from "./components/Search/SearchPage";
import Profile from "./components/Profile";
import ParentComponent from "./components/HOCs/jwtAuthGuard";
import MovieInfo from "./components/MovieInfo/MovieInfo";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <NavBar />
          <Route path="/home" exact component={ParentComponent(SearchPage)} />
          <Route
            path="/watchlist"
            exact
            component={ParentComponent(WatchList)}
          />
          <Route
            path="/movieinfo/"
            render={props => <MovieInfo {...props} />}
          />
          <Route path="/" exact component={LoginPage} />
          <Route path="/profile" exact component={ParentComponent(Profile)} />
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
