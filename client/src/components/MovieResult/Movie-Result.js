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
import "../../styles/movieHover.css";

class ImageResults extends Component {
  state = {
    apiUrl: "https://api.themoviedb.org/3/genre/movie/list",
    apiKey: "0d9a8d275e343ddfe2589947fe17d099",
    genres: [],
    imageLoading: true
  };

  addToWatchList = img => {
    this.props.addMovie(this.props.userID, img);
    if (this.props.images) {
      console.log("sucess");
    } else {
      console.log("not success");
    }
    //this.props.getMovies(this.props.userID);
  };

  render() {
    //Not defining with let
    let imageListContent;

    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cols={5} cellHeight="auto">
          {images.map(img => (
            <GridListTile key={img.id} className="tilePoster">
              {/* Lägg in en hoverfunktion över bilderna likt plex (dvs en border i primaryColor)*/}
              <Link
                to={{
                  pathname: `/movieInfo/${img.id}`
                }}
              >
                <div className="vignette">
                  <img
                    style={
                      !this.state.imageLoading
                        ? { cursor: "pointer", height: "100%", width: "100%" }
                        : { display: "none", height: "100%", width: "100%" }
                    }
                    src={`http://image.tmdb.org/t/p/w185/${img.poster_path}`}
                    alt="Movie Poster"
                    onLoad={() => this.setState({ imageLoading: false })}
                    // Länka vidare till MovieInfo
                    onClick={() => this.props.setMovieID(img.id)}
                    onError={e => {
                      this.setState({ imageLoading: false });
                      //Could give endless loop if not: e.target.onerror = null;
                      e.onError = null;
                      e.target.src = require("../../images/error.png");
                    }}
                  />
                </div>
              </Link>
              <GridListTileBar
                title={img.original_title}
                key={img.id}
                subtitle={
                  <span>
                    <strong>{img.release_date}</strong>
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
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired,
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  setMovieID: PropTypes.func.isRequired,
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
