import React, { Component, Fragment } from "react";
import {
  Toolbar,
  AppBar,
  Typography,
  Button,
  IconButton,
  Icon
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import { withStyles } from "@material-ui/core/styles";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logout } from "../../actions/authActions";
import SearchField from "../Search/SearchField";

//Routing
const watchListLink = props => <Link to="/watchlist" {...props} />;
const profileLink = props => <Link to="/profile" {...props} />;
const homeLink = props => <Link to="/home" {...props} />;
const loginPage = props => <Link to="/" {...props} />;

class NavBar extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="inherit"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" className={classes.grow}>
              MovieSquare
            </Typography>
            <SearchField />
            {!this.props.isAuthenticated ? (
              <Button component={loginPage}>
                <Icon>lock</Icon>
              </Button>
            ) : (
              <Fragment>
                <Button onClick={this.logoutButton}>
                  <Typography>Log out</Typography>
                </Button>
                <Button component={watchListLink} color="inherit">
                  <Icon>playlist_play</Icon>
                </Button>
                <Button component={homeLink} color="inherit">
                  <Icon>home</Icon>
                </Button>
                <Button component={profileLink} color="inherit">
                  <Icon>account_circle</Icon>
                </Button>
              </Fragment>
            )}

            {/*<PopperList />*/}
          </Toolbar>
        </AppBar>
      </div>
    );
  }

  logoutButton = async () => {
    console.log("You are now logged out");

    await this.props.logout();
    this.isUserAuthenticated();
  };

  isUserAuthenticated() {
    if (!this.props.isAuthenticated || !this.props.token) {
      this.props.history.push("/");
    }
  }
}

const styles = {
  flex: {
    flex: 1
  },
  root: {
    flexGrow: 1,
    marginBottom: 80
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
  logout: PropTypes.func
};

export default withRouter(
  connect(
    mapStateToProps,
    { logout }
  )(withStyles(styles)(NavBar))
);
