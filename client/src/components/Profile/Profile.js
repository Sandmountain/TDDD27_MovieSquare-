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

    const { classes } = this.props;
    return (
      <Fragment>
        <PieChart />
        <PieChartLedgend />
        <Grid container justify="center" alignItems="center">
          <Typography color="secondary" variant="h4" gutterBottom>
            {`This is ${selectName(decodedToken)}'s profile!`}
          </Typography>
        </Grid>

        <Grid container justify="center" alignItems="center">
          <Grid item sm={8}>
            <Paper style={styles.MainBody}>
              <Paper style={styles.inlineMainBody}>
                <Typography color="primary" variant="h5" gutterBottom>
                  <strong>This is your favorite genre/s:</strong>
                </Typography>

                <div id="PieChartDiv" />
                <div id="PieChartLedgendDiv" />

                <Divider className={classes.dividerStyle} />
                <Typography color="primary" variant="h6" gutterBottom>
                  Recommended Movies
                </Typography>
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

const selectName = decodedToken => {
  if (decodedToken.facebook) {
    return decodedToken.facebook.name;
  } else if (decodedToken.google) {
    return decodedToken.google.name;
  } else {
    return "name";
  }
};

const styles = {
  inlineMainBody: {
    width: "100%",
    minHeight: "700px",
    padding: 4,
    backgroundColor: "white"
  },
  MainBody: {
    width: "100%",
    padding: "10px"
  },
  root: {
    marginTop: "30px",
    marginBottom: "2px",
    display: "flex",
    alignItems: "center"
  },
  dividerStyle: {
    borderBottom: "1px solid",
    color: "#343a40",
    marginBottom: "20px",
    marginTop: "20px"
  }
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
