import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { getMovies } from "../../actions/userWatchlistAction";
import axios from "axios";
import uuid from "uuid";
import config from "../../config.json";
import { Link } from "react-router-dom";

import {
  Grid,
  GridList,
  GridListTile,
  GridListTileBar,
  IconButton,
  Icon,
  withStyles
} from "@material-ui/core";

const styles = {
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
    transform: "translateZ(0)"
  },
  title: {
    color: "white"
  },
  titleBar: {
    background:
      "linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)"
  }
};

class RecommendedMovies extends Component {
  state = {
    movieRecData: []
  };

  componentDidMount() {
    this.props.getMovies(this.props.userID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      if (!this.props.loading) {
        this.getMovieInfo(this.props.movies);
      }
    }
  }

  getMovieInfo = movies => {
    // Get random movie from watchlist
    let movieID = movies[Math.floor(Math.random() * movies.length)].movieID;
    if (movieID !== "" && typeof movieID !== "undefined") {
      axios
        .get(
          `${config.themovieDB.movieURL}/${movieID}?api_key=${
            config.themovieDB.apiKey
          }&append_to_response=recommendations`
        )
        .then(res => {
          this.setState({ movieRecData: res.data });
        })
        .catch(error => {});
    }
    //console.log(this.state.movieRecData.recommendations);
  };

  render() {
    const { classes, movies } = this.props;
    //console.log(movies);
    console.log(this.state.movieRecData.recommendations);

    return (
      <Fragment>
        {this.state.movieRecData.recommendations.results ? (
          <Grid className={classes.rootGridListRecommended}>
            <GridList className={classes.gridList} cols={2.5}>
              {this.state.movieRecData.recommendations.results.map(img => (
                <GridListTile key={uuid()}>
                  <img
                    src={
                      config.themovieDB.imageUrl +
                      config.themovieDB.imageSizes +
                      img.poster_path
                    }
                    alt={img.title}
                  />
                  <GridListTileBar
                    title={img.title}
                    classes={{
                      root: classes.titleBar,
                      title: classes.title
                    }}
                    actionIcon={
                      <IconButton>
                        <Icon>playlist_add</Icon>
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </Grid>
        ) : null}
      </Fragment>
    );
  }
}

RecommendedMovies.propTypes = {
  classes: PropTypes.object.isRequired,
  userID: PropTypes.string.isRequired,
  getMovies: PropTypes.func.isRequired,
  movies: PropTypes.array.isRequired,
  loading: PropTypes.bool.isRequired
};

const mapStateToProps = state => ({
  movies: state.movie.movies,
  userID: state.auth.userID,
  loading: state.movie.loading
});

export default connect(
  mapStateToProps,
  { getMovies }
)(withStyles(styles)(RecommendedMovies));
