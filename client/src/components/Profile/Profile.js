import React, { Component, Fragment } from "react";
import {
  Grid,
  Paper,
  withStyles,
  Divider,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";
import jwtDecode from "jwt-decode";

import PieChart from "./PieChart";
import PieChartLedgend from "./PieChartLedgend";
import RecommendedMovies from "./RecommendedMovies";
import TheLists from "./TheLists";

class Profile extends Component {
  render() {
    const jwtToken = localStorage.getItem("JWT_TOKEN");
    const decodedToken = jwtToken ? jwtDecode(jwtToken) : "";
    console.log("decodedToken", decodedToken);

    const { classes } = this.props;
    return (
      <Fragment>
        <PieChart />
        <PieChartLedgend />
        <Grid container justify="center" alignItems="center">
          <Typography color="secondary" variant="h1" gutterBottom>
            {`This is ${
              decodedToken.facebook
                ? decodedToken.facebook.name
                : decodedToken.google.name
            } profile!`}
          </Typography>
        </Grid>

        <Grid container justify="center" alignItems="center">
          <Grid item sm={8}>
            <Paper style={styles.MainBody}>
              <Paper style={styles.inlineMainBody}>
                <Typography color="primary" variant="h3" gutterBottom>
                  This is your favorite genre/s:
                </Typography>
                <div id="PieChartDiv" />
                <div id="PieChartLedgendDiv" />
                <Divider className={classes.dividerStyle} />
                <RecommendedMovies />
                <Divider className={classes.dividerStyle} />
                <TheLists />
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}
const styles = {
  inlineMainBody: {
    width: "100%",
    minHeight: "1000px",
    padding: 4,
    backgroundColor: "white"
  },
  MainBody: {
    width: "100%",
    minHeight: "1000px",
    padding: "10px"
  },
  root: {
    marginTop: "30px",
    marginBottom: "2px",
    display: "flex",
    alignItems: "center"
  },
  dividerStyle: {
    borderBottom: "2px solid black",
    marginBottom: "20px",
    marginTop: "20px"
  }
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
