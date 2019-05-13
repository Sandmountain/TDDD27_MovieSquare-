import React, { Component, Fragment } from "react";
import { Grid, Typography, Divider, Icon, Fab } from "@material-ui/core";
import SimilarMovies from "./SimiliarMovies";
import BottomNavBar from "./BottomNavBar";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import config from "../../config.json";
import axios from "axios";
import { getMovieID } from "../../actions/movieInfoAction";
import { connect } from "react-redux";

//Flera resultat med append_to_respons=
//http://api.themoviedb.org/3/movie/157336?api_key=0d9a8d275e343ddfe2589947fe17d099&append_to_response=videos
//https://api.themoviedb.org/3/movie/299534/similar?api_key=0d9a8d275e343ddfe2589947fe17d099&language=en-US&page=1
//https://api.themoviedb.org/3/movie/299534/recommendations?api_key=0d9a8d275e343ddfe2589947fe17d099&language=en-US&page=1

//Include actors? Actor Page samma som movie info
//Actor med movies
//https://api.themoviedb.org/3/person/1245?api_key=0d9a8d275e343ddfe2589947fe17d099&&append_to_response=movie_credits

//Använda sig av OMDBapi:t för imdb score, rotten tomatoes etc...?
// i= (imdbID som fås från andra apit) finns dock limit här på hur många queries som får göras...
//http://www.omdbapi.com/?apikey=6f9b4562&i=tt4154796

const styles = theme => ({
  foreGroundImage: {
    position: "relative",
    zIndex: "5",
    padding: "12px "
  },
  backdropStyle: {
    position: "absolute",
    zIndex: 1,
    flexShrink: "0",
    maxWidth: "100%",
    minHeight: "100%",
    opacity: "0.2"
  },
  fabButtons: {
    marginRight: 10
  },
  backgroundDiv: {
    width: "100%",
    height: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden"
  }
});

class MovieInfo extends Component {
  constructor(props) {
    super(props);
    this.getMovieInfo();
    this.state = {
      data: []
    };
  }

  componentDidMount() {
    this.props.getMovieID();
  }

  getMovieInfo = () => {
    let movieID = this.props.id;
    if (movieID !== "") {
      axios
        .get(
          `${config.themovieDB.movieURL}/${movieID}?api_key=${
            config.themovieDB.apiKey
          }&append_to_response=credits,videos,similar`
        )
        .then(res => {
          this.setState({ data: res.data });
          //console.log(res.data);
        });
    }
  };

  render() {
    const { classes } = this.props;

    return (
      <Fragment>
        <Grid
          item
          style={{
            borderTopLeftRadius: "5px",
            borderTopRightRadius: "5px",
            position: "relative",
            overflow: "hidden",
            minHeight: "100%"
          }}
        >
          <img
            src={`http://image.tmdb.org/t/p/original/${
              this.state.data.backdrop_path
            }`}
            alt="img"
            className={classes.backdropStyle}
          />
          <Grid container>
            <Grid item sm={3} className={classes.foreGroundImage}>
              <img
                alt="img"
                style={{
                  maxWidth: "90%",
                  height: "auto",
                  boxShadow: "0px 0px 5px 1px rgba(0,0,0,0.75)"
                }}
                src={`http://image.tmdb.org/t/p/w185/${
                  this.state.data.poster_path
                }`}
              />
            </Grid>
            <Grid item sm={9} className={classes.foreGroundImage}>
              <Typography
                color="primary"
                variant="h3"
                display="block"
                style={{ opacity: 1, zIndex: "2" }}
              >
                {this.state.data.title}
              </Typography>
              <Typography color="inherit" variant="subtitle2" gutterBottom>
                Released {this.state.data.year}{" "}
              </Typography>
              <Typography
                color="inherit"
                align="right"
                variant="subtitle2"
                gutterBottom
              >
                {this.state.data.genres + " "} | {this.state.data.runtime}min |{" "}
                {this.state.data.original_language}
              </Typography>

              <Divider style={{ marginTop: 10, marginBottom: 10 }} />

              <Fab
                size="medium"
                color="secondary"
                aria-label="Edit"
                variant="extended"
                className={classes.fabButtons}
              >
                <b>{this.state.data.vote_average}</b>
              </Fab>
              <Fab
                size="small"
                color="primary"
                aria-label="Edit"
                className={classes.fabButtons}
              >
                <Icon>playlist_add</Icon>
              </Fab>
              <Fab
                size="small"
                color="primary"
                aria-label="Edit"
                className={classes.fabButtons}
              >
                <Icon>home</Icon>
              </Fab>
              <Fab
                size="small"
                color="primary"
                aria-label="Edit"
                className={classes.fabButtons}
              >
                <Icon>play_arrow</Icon>
              </Fab>

              <Divider style={{ marginTop: 10, marginBottom: 10 }} />
              <Typography color="inherit" variant="h6">
                Overview
              </Typography>
              <Typography color="inherit" variant="body1">
                {this.state.data.overview}
              </Typography>
              <Divider style={{ marginBottom: "20px" }} />

              <Grid item sm={12}>
                <Typography color="inherit" variant="body1">
                  <b>Directors:</b> Joe Russo, Anthony Russo
                </Typography>
                <Typography color="inherit" variant="body1">
                  <b>Writers:</b> Joe Russo, Anthony Russo
                </Typography>
                <Typography color="inherit" variant="body1">
                  <b>Cast:</b> Joe Russo, Anthony Russo
                </Typography>
                {this.state.data.tagline ? (
                  <Fragment>
                    <Divider style={{ marginTop: "20px" }} />
                    <Typography
                      color="inherit"
                      variant="inherit"
                      style={{ paddingLeft: "50px", fontStyle: "italic" }}
                    >
                      "{this.state.data.tagline}..."
                    </Typography>
                  </Fragment>
                ) : (
                  <div />
                )}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Divider />
        <Grid item sm={12}>
          <Divider />
          <SimilarMovies
            similiar={this.state.data.similar}
            style={{ overflow: "hide" }}
          />
        </Grid>

        <Grid item sm={12}>
          <BottomNavBar />
        </Grid>
      </Fragment>
    );
  }
}

MovieInfo.propTypes = {
  classes: PropTypes.object.isRequired,
  getMovieID: PropTypes.func.isRequired,
  id: PropTypes.string
};

const mapStateToProps = state => ({
  id: state.movieID.id
});

export default connect(
  mapStateToProps,
  { getMovieID }
)(withStyles(styles)(MovieInfo));

/*
mapStateToProps,
  { getMovies, deleteMovie }
*/
