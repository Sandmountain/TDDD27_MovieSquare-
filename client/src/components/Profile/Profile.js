import React, { Component, Fragment } from "react";
import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Paper,
  withStyles,
  Divider,
  Typography,
  List,
  ListItem,
  ListItemText,
  Avatar
} from "@material-ui/core";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import ImageIcon from "@material-ui/icons/Image";
import WorkIcon from "@material-ui/icons/Work";
import BeachAccessIcon from "@material-ui/icons/BeachAccess";
import tileData from "./tileData";
import PropTypes from "prop-types";
import PieChart from "./PieChart";
import PieChartLedgend from "./PieChartLedgend";

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
  rootGridListRecommended: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    justifyContent: "space-around",
    overflow: "hidden",
    backgroundColor: "white"
  },
  gridList: {
    flexWrap: "nowrap",
    // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    transform: "translateZ(0)"
  },
  title: {
    color: "white"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
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
                <div className={classes.rootGridListRecommended}>
                  <GridList className={classes.gridList} cols={2.5}>
                    {tileData.map(tile => (
                      <GridListTile key={tile.img}>
                        <img src={tile.img} alt={tile.title} />
                        <GridListTileBar
                          title={tile.title}
                          classes={{
                            root: classes.titleBar,
                            title: classes.title
                          }}
                          actionIcon={
                            <IconButton>
                              <StarBorderIcon className={classes.title} />
                            </IconButton>
                          }
                        />
                      </GridListTile>
                    ))}
                  </GridList>
                </div>
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
