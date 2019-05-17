import React, { Component } from "react";
import {
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton,
  GridList
} from "@material-ui/core";
import PropTypes from "prop-types";
import uuid from "uuid";
import { addMovie } from "../../actions/userWatchlistAction";

import { Link } from "react-router-dom";
//Redux
import { connect } from "react-redux";
import { setMovieID, getMovieID } from "../../actions/movieInfoAction";

class SimiliarMovies extends Component {
  render() {
    //const similar
    // {this.props.similar ?  { similar } = this.props.similar : null }

    let similarResults;
    this.props.similar
      ? (similarResults = this.props.similar.results.slice(0, 5))
      : (similarResults = null);
    return (
      <div>
        {this.props.similar ? (
          <div>
            <GridList cols={5}>
              {similarResults.map(img => (
                <GridListTile key={uuid()}>
                  <Link
                    to={{
                      pathname: `/movieInfo/${img.id}`
                    }}
                  >
                    {img.poster_path ? (
                      <img
                        src={`http://image.tmdb.org/t/p/w185/${
                          img.poster_path
                        }`}
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

                    <GridListTileBar
                      title={img.title}
                      key={img.id}
                      subtitle={<span>Year: {img.release_date}</span>}
                      actionIcon={
                        <IconButton
                          color="secondary"
                          onClick={() =>
                            this.props.addMovie(this.props.userID, img)
                          }
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
      </div>
    );
  }
}

SimiliarMovies.propTypes = {
  similar: PropTypes.object
};

const mapStateToProps = state => ({
  movie: state.movie,
  id: state.movieID.id,
  userID: state.auth.userID
});

export default connect(
  mapStateToProps,
  { setMovieID, getMovieID, addMovie }
)(SimiliarMovies);
