import React, { Component } from "react";
import {
  Toolbar,
  AppBar,
  Typography,
  Button,
  IconButton,
  InputBase,
  Icon
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import axios from "axios";

const watchListLink = props => <Link to="/watchlist" {...props} />;
const profileLink = props => <Link to="/profile" {...props} />;
const homeLink = props => <Link to="/" {...props} />;

class Test extends Component {
  state = {
    searchText: "",
    amount: 10,
    apiUrl: "https://api.themoviedb.org/3/search/movie",
    apiKey: "0d9a8d275e343ddfe2589947fe17d099",
    imageUrl: "http://image.tmdb.org/t/p/w185/",
    imageSizes: "w185",
    images: []
  };

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.searchText.length > 0) {
        axios
          .get(
            `${this.state.apiUrl}?api_key=${this.state.apiKey}&query=${
              this.state.searchText
            }&sort_by=popularity.desc`
          )
          .then(res => this.setState({ images: res.data.results }))
          .catch(err => console.log(err));
      } else {
        return this.setState({ images: "" });
      }
    });
  };

  render() {
    return (
      <div className={styles.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={styles.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={styles.grow}>
              MovieSquare
            </Typography>

            <InputBase
              style={styles.inputField}
              name="searchText"
              value={this.state.searchText}
              onChange={this.onTextChange}
              placeholder="Search Google Maps"
            />
            <IconButton
              style={styles.iconButton}
              color="primary"
              aria-label="Search"
            >
              <Icon>search</Icon>
            </IconButton>

            <Button component={watchListLink} color="inherit">
              <Icon>playlist_play</Icon>
            </Button>
            <Button component={homeLink} color="inherit">
              <Icon>home</Icon>
            </Button>
            <Button component={profileLink} color="inherit">
              <Icon>account_circle</Icon>
            </Button>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
const styles = {
  flex: {
    flex: 1
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  inputField: {
    paddingLeft: 20,
    width: 600,
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

Test.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Test);
