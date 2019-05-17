import React, { Component, Fragment } from "react";
import SocialLogin from "./SocialLogin";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { connect } from "react-redux";

const styles = theme => ({
  root: {
    paddingTop: 80,
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
});

class LoginPage extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Grid container justify="center" alignItems="center" spacing={24}>
          <Grid item xs={6}>
            <Paper className={classes.paper}>
              {!this.props.isAuthenticated ? (
                <Fragment>
                  <h1 className="App-title">Welcome to MovieSquare!</h1>
                  <p className="App-intro">
                    To get started please login with either Facebook or Google.
                  </p>{" "}
                </Fragment>
              ) : (
                <h1>You are logged in!!!</h1>
              )}

              <SocialLogin />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired,
  isAuthenticated: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(withStyles(styles)(LoginPage));
