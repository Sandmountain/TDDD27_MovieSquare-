import React from "react";
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
import PropTypes from "prop-types";
import PopperList from "../Watchlist/PopperList";

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
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
};

const watchListLink = props => <Link to="/watchlist" {...props} />;
const profileLink = props => <Link to="/profile" {...props} />;
const homeLink = props => <Link to="/" {...props} />;
const loginPage = props => <Link to="/loginpage" {...props} />;

function NavBar(props) {
  const { classes } = props;
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
          <Button component={loginPage}>
            <Icon>lock</Icon>
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
          <PopperList />
        </Toolbar>
      </AppBar>
    </div>
  );
}

NavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(NavBar);
