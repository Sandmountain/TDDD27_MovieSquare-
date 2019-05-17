import React, { Component, Fragment } from "react";
import {
  IconButton,
  GridList,
  GridListTile,
  GridListTileBar,
  Icon,
  Grid
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import YouTube from "react-youtube";

class MovieClips extends Component {
  state = {
    imageLoading: true,
    youTubeKey: null,
    open: false,
    showModal: true
  };
  render() {
    //Only the first 10 movies
    const movieClip = this.props.movieClips.slice(0, 10);
    const length = movieClip.length > 5 ? 5 : movieClip.length;
    const { classes } = this.props;

    return (
      <GridList cols={length} cellHeight="auto" style={{ marginTop: "3px" }}>
        {movieClip.map((img, index) => (
          <GridListTile key={img.id}>
            <img
              style={
                !this.state.imageLoading
                  ? { cursor: "pointer", height: "100%", width: "100%" }
                  : { display: "none", height: "100%", width: "100%" }
              }
              className="imageDiv"
              src={`https://img.youtube.com/vi/${img.key}/0.jpg`}
              alt="Movie Poster"
              onLoad={() => this.setState({ imageLoading: false })}
              onClick={() => {
                this.handleOpen();
                this.setState({ youTubeKey: img.key });
              }}
              onError={e => {
                this.setState({ imageLoading: false });

                e.onError = null;
                e.target.src = require("../../images/error.png");
              }}
            />

            <GridListTileBar
              title={img.length}
              style={{ height: "35px" }}
              key={img.id}
              subtitle={
                <span>
                  <strong>{img.name}</strong>
                </span>
              }
            />
          </GridListTile>
        ))}
        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          onBackdropClick={this.handleClose}
        >
          <YouTube
            videoId={this.state.youTubeKey}
            opts={{
              height: "390",
              width: "640",
              playerVars: {
                autoplay: 1
              }
            }}
          />
        </Modal>
      </GridList>
    );
  }

  handleOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };
}

const styles = theme => ({
  paperModal: {
    position: "absolute",
    outline: "none",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`
  }
});

MovieClips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieClips);
