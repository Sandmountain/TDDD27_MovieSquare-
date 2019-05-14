import React, { Component } from "react";
import SocialLogin from "./SocialLogin";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";

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
              <h1 className="App-title">Welcome to MovieSquare!</h1>
              <p className="App-intro">
                To get started please login with either Facebook or Google.
              </p>
              <SocialLogin />
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

LoginPage.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LoginPage);
