import React, { Component, Fragment } from "react";
import { Grid, Paper, CircularProgress, Typography } from "@material-ui/core";
import MovieResult from "../MovieResult/Movie-Result";
import { connect } from "react-redux";
import { getSearchResults } from "../../actions/searchAction";

class Search extends Component {
  render() {
    const { results, loading } = this.props.results;
    return (
      <div>
        <Grid container justify="center" alignItems="center">
          <Grid item sm={8}>
            <Paper style={styles.MainBody}>
              <Paper style={styles.inlineMainBody}>
                {results.length > 0 ? (
                  <MovieResult images={results} />
                ) : (
                  <Fragment>
                    {/* Make a nice component for no results*/}
                    {loading ? (
                      <Fragment>
                        <CircularProgress
                          size={60}
                          style={{
                            position: "relative",
                            left: "50%",
                            marginTop: 100
                          }}
                        />{" "}
                      </Fragment>
                    ) : (
                      <Typography
                        color="primary"
                        align="center"
                        style={{
                          marginTop: 100
                        }}
                      >
                        {" "}
                        No results{" "}
                      </Typography>
                    )}
                  </Fragment>
                )}
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = {
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
  },
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
    //backgroundColor: "#f44336"
    //backgroundColor: "#434343"
  }
};

const mapStateToProps = state => ({
  results: state.results,
  isSearching: state.loading
});

export default connect(
  mapStateToProps,
  { getSearchResults }
)(Search);
