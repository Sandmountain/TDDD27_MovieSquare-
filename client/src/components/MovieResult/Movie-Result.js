import React, { Component } from "react";
import PropTypes from "prop-types";
import {
  IconButton,
  GridList,
  GridListTile,
  GridListTileBar,
  Icon
} from "@material-ui/core";
import { setMovieID } from "../../actions/movieInfoAction";
import { Link } from "react-router-dom";

//Redux
import { connect } from "react-redux";
import { addMovie, getMovies } from "../../actions/userWatchlistAction";
import axios from "axios";

class ImageResults extends Component {
  state = {
    apiUrl: "https://api.themoviedb.org/3/genre/movie/list",
    apiKey: "0d9a8d275e343ddfe2589947fe17d099",
    genres: [],
    imageLoading: true
  };

  handleImageLoaded() {
    this.setState({ imageLoading: false });
  }
  handleImageError() {
    console.log("No image");
  }

  addToWatchList = img => {
    let genres = [];

    //Function for Finding the genres for each movie from their id
    for (let i = 0; i < img.genre_ids.length; i++) {
      for (let j = 0; j < this.state.genres.length; j++) {
        if (img.genre_ids[i] === this.state.genres[j].id) {
          genres.push(this.state.genres[j].name);
        }
      }
    }
    const newMovie = {
      movieID: img.id,
      imgURL: img.poster_path ? img.poster_path : require("./error.png"),
      movieTitle: img.original_title,
      title: img.title,
      backdropURL: img.backdrop_path,
      overview: img.overview,
      rating: img.vote_average,
      language: img.original_language,
      releaseDate: img.release_date,
      movieGenre: genres
    };

    //Add item via addItem Action if not in the wwatchlist
    if (this.props.movie.movies.length < 0) {
      if (
        this.props.movie.movies.filter(
          movies => movies.movieTitle === img.original_title
        ).length > 0
      ) {
        console.log("exists");
      }
    } else {
      console.log("Should add movie");

      this.props.addMovie(this.props.userID, newMovie);
    }

    //TODO: Change the star to filled...?
  };

  idToString = img => {
    var genres;
    for (var i = 0; i < img.genre_ids.length; i++) {
      for (var j = 0; i < this.state.genres.length; j++) {
        if (img.genre_ids === this.state.genres[i].id)
          genres[i] = this.state.genres[i].name;
      }
    }

    return genres;
  };

  render() {
    //Not defining with let
    let imageListContent;

    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cols={5} cellHeight="auto">
          {images.map(img => (
            <GridListTile key={img.id}>
              {/* Lägg in en hoverfunktion över bilderna likt plex (dvs en border i primaryColor)*/}
              <Link
                to={{
                  pathname: `/movieInfo/${img.id}`
                }}
              >
                <img
                  style={
                    !this.state.imageLoading
                      ? { cursor: "pointer", height: "100%", width: "100%" }
                      : { display: "none", height: "100%", width: "100%" }
                  }
                  className="imageDiv"
                  src={`http://image.tmdb.org/t/p/w185/${img.poster_path}`}
                  alt="Movie Poster"
                  onLoad={() => this.setState({ imageLoading: false })}
                  // Länka vidare till MovieInfo
                  onClick={() => this.props.setMovieID(img.id)}
                  onError={e => {
                    this.setState({ imageLoading: false });
                    //Could give endless loop if not: e.target.onerror = null;
                    e.onError = null;
                    e.target.src = require("./error.png");
                  }}
                />
              </Link>
              <GridListTileBar
                title={img.original_title}
                key={img.id}
                subtitle={
                  <span>
                    by <strong>{img.release_date}</strong>
                  </span>
                }
                actionIcon={
                  <IconButton
                    color="secondary"
                    onClick={() => this.addToWatchList(img)}
                  >
                    <Icon>playlist_add</Icon>
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
      //Spinner here probably
    }
    return <div>{imageListContent}</div>;
  }

  //getting ids from database (could possibly be done localy instead)
  componentDidMount() {
    this.props.getMovies(this.props.userID);
    axios
      .get(`${this.state.apiUrl}?api_key=${this.state.apiKey}&language=en-US`)
      .then(res => this.setState({ genres: res.data.genres }))
      .catch(err => console.log(err));
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired,
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  setMovieID: PropTypes.func.isRequired,
  id: PropTypes.string,
  userID: PropTypes.string
};

const mapStateToProps = state => ({
  movie: state.movie,
  id: state.movieID.id,
  userID: state.auth.userID
});

export default connect(
  mapStateToProps,
  { addMovie, getMovies, setMovieID }
)(ImageResults);
