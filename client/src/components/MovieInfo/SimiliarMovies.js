import React, { Component } from "react";
import {
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton,
  GridList,
  Snackbar
} from "@material-ui/core";
import PropTypes from "prop-types";
import uuid from "uuid";
import { addMovie, getMovies } from "../../actions/userWatchlistAction";

import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { setMovieID, getMovieID } from "../../actions/movieInfoAction";
import "../../styles/movieHover.css";

class SimiliarMovies extends Component {
  state = {
    addedMovie: "",
    showInfo: false
  };
  render() {
    let similarResults;
    this.props.similar
      ? (similarResults = this.props.similar.results.slice(0, 5))
      : (similarResults = null);
    return (
      <div>
        {this.props.similar ? (
          <div>
            <GridList cols={5}>
              >
              {similarResults.map(img => (
                <GridListTile key={uuid()}>
                  <Link
                    to={{
                      pathname: `/movieInfo/${img.id}`
                    }}
                  >
                    <div className="vignette">
                      {img.poster_path ? (
                        <img
                          style={{ width: "100%", heigh: "100%" }}
                          src={`http://image.tmdb.org/t/p/w185/${
                            img.poster_path
                          }`}
                          className="moviePoster"
                          alt=""
                          onError={e => {
                            this.onerror = null;
                            e.target.src = require("../../images/error.png");
                          }}
                          onClick={() => {
                            this.props.setMovieID(img.id);
                            //forceUpdate();
                          }}
                        />
                      ) : (
                        <img src={require("../../images/error.png")} alt="" />
                      )}
                    </div>
                    <GridListTileBar
                      title={img.title}
                      key={img.id}
                      subtitle={<span>Year: {img.release_date}</span>}
                      actionIcon={
                        <IconButton
                          color="secondary"
                          onClick={() => {
                            this.props.addMovie(this.props.userID, img);
                            this.props.getMovies(this.props.userID);
                            this.setState({
                              showInfo: true,
                              addedMovie: img.original_title
                            });
                          }}
                        >
                          <Icon>playlist_add</Icon>
                        </IconButton>
                      }
                    />
                  </Link>
                </GridListTile>
              ))}
            </GridList>
          </div>
        ) : (
          <div />
        )}
        <Snackbar
          message={
            <span id="message-id">
              Added <strong>{this.state.addedMovie}</strong> to the watchlist
            </span>
          }
          anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          open={this.state.showInfo}
          autoHideDuration={3000}
          onClose={() => this.handleClose()}
        />
      </div>
    );
  }
  handleClose() {
    this.setState({ showInfo: false });
  }
}

SimiliarMovies.propTypes = {
  similar: PropTypes.object
};

const mapStateToProps = state => ({
  movie: state.movie,
  id: state.movieInfo.id,
  userID: state.auth.userID
});

export default connect(
  mapStateToProps,
  { setMovieID, getMovieID, addMovie, getMovies }
)(SimiliarMovies);
