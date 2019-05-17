import React, { Component, Fragment } from "react";
import MovieInfo from "./MovieInfo";
import { Grid, Paper } from "@material-ui/core";

export default class MovieInfoMainBody extends Component {
  render() {
    return (
      <Fragment>
        <Grid container justify="center" alignItems="center">
          <Grid item sm={8}>
            <Paper style={styles.MainBody}>
              <Paper style={styles.inlineMainBody}>
                <MovieInfo />
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
    minHeight: "700px",
    padding: 4,
    backgroundColor: "white"
  },
  MainBody: {
    width: "100%",
    minHeight: "700px",
    padding: "10px"
  },
  root: {
    marginTop: "30px",
    marginBottom: "2px",
    display: "flex",
    alignItems: "center"
  },
  inputField: {
    paddingLeft: 20,
    width: 600,
    flex: 1
  }
};
