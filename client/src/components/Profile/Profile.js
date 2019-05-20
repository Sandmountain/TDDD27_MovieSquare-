import React, { Component, Fragment } from "react";
import { Grid, Paper, withStyles, Divider } from "@material-ui/core";

import PropTypes from "prop-types";
import PieChart from "./PieChart";
import PieChartLedgend from "./PieChartLedgend";
import RecommendedMovies from "./RecommendedMovies";
import TheLists from "./TheLists";

class Profile extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <PieChart />
        <PieChartLedgend />
        <Grid container justify="center" alignItems="center">
          <div>
            <h1>This is the profile!</h1>
          </div>
        </Grid>

        <Grid container justify="center" alignItems="center">
          <Grid item sm={8}>
            <Paper style={styles.MainBody}>
              <Paper style={styles.inlineMainBody}>
                <div id="PieChartDiv" />
                <div id="PieChartLedgendDiv" />
                <Divider
                  style={{
                    borderBottom: "2px solid black",
                    marginBottom: "20px",
                    marginTop: "20px"
                  }}
                />
                <RecommendedMovies />
                <Divider
                  style={{
                    borderBottom: "2px solid black",
                    marginBottom: "20px",
                    marginTop: "20px"
                  }}
                />
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
  }
};

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
