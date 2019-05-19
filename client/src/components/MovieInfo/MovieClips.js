import React, { Component } from "react";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import PropTypes from "prop-types";
import YouTube from "react-youtube";
import "../../styles/movieHover.css";
import PlayCircleOutline from "@material-ui/icons/PlayCircleOutlineOutlined";

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
      <div className={classes.root}>
        {movieClip.length > 0 ? (
          <GridList cols={length} cellHeight="auto" style={{ marginTop: 0 }}>
            {movieClip.map(img => (
              <GridListTile key={img.id}>
                <div className="vignette">
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
                  <div className="playIcon">
                    <span>
                      <PlayCircleOutline
                        className={classes.playIcon}
                        fontSize="large"
                      />
                    </span>
                  </div>
                </div>
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
          </GridList>
        ) : (
          <Typography
            align="center"
            color="inherit"
            style={{ paddingTop: 20, paddingBottom: 20 }}
          >
            No movie clips
          </Typography>
        )}

        <Modal
          open={this.state.open}
          onClose={this.handleClose}
          onBackdropClick={this.handleClose}
          style={{ width: "100%" }}
        >
          <div className={classes.paperModal}>
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
          </div>
        </Modal>
      </div>
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
  root: {
    minWidth: "100%",
    marginTop: "2px"
  },
  paperModal: {
    position: "absolute",
    outline: "none",
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
    boxShadow: theme.shadows[5]
  },
  playIcon: {
    color: theme.palette.secondary.dark
  }
});

MovieClips.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MovieClips);
