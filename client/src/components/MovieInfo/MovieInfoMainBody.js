import React, { Component } from "react";
import MovieInfo from "./MovieInfo";
import { Grid, Paper } from "@material-ui/core";

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
  }
};

export default class MovieInfoMainBody extends Component {
  render() {
    return (
      <Grid
        container
        justify="center"
        alignItems="center"
        style={{ paddingTop: 80 }}
      >
        <Grid item sm={8}>
          <Paper style={styles.MainBody}>
            <Paper style={styles.inlineMainBody}>
              <MovieInfo />
            </Paper>
          </Paper>
        </Grid>
      </Grid>
    );
  }
}
