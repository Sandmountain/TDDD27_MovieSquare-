import React, { Component, Fragment } from "react";
import {
  Grid,
  Paper,
  withStyles,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar
} from "@material-ui/core";

import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";

import PropTypes from "prop-types";
import PieChart from "./PieChart";
import PieChartLedgend from "./PieChartLedgend";
import RecommendedMovies from "./RecommendedMovies";

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
  typoColor: {
    color: "black"
  },
  theLists: {
    display: "flex"
  },
  movieList: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: "grey"
  }
};

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
                <Grid continer className={classes.theLists}>
                  <Grid item xs={6}>
                    <Typography
                      className={classes.typoColor}
                      variant="h2"
                      gutterBottom
                    >
                      Watchlist
                    </Typography>
                    <List className={classes.movieList}>
                      <ListItem>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                        <ListItemText primary="Photos" />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <WorkIcon />
                        </Avatar>
                        <ListItemText primary="Work" />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                        <ListItemText primary="Vacation" />
                      </ListItem>
                    </List>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography
                      className={classes.typoColor}
                      variant="h2"
                      gutterBottom
                    >
                      History
                    </Typography>
                    <List className={classes.movieList}>
                      <ListItem>
                        <Avatar>
                          <ImageIcon />
                        </Avatar>
                        <ListItemText primary="Photos" />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <WorkIcon />
                        </Avatar>
                        <ListItemText primary="Work" />
                      </ListItem>
                      <ListItem>
                        <Avatar>
                          <BeachAccessIcon />
                        </Avatar>
                        <ListItemText primary="Vacation" />
                      </ListItem>
                    </List>
                  </Grid>
                </Grid>
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      </Fragment>
    );
  }
}

Profile.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Profile);
