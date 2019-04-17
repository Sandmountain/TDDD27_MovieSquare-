import React, { Component } from "react";
import PropTypes from "prop-types";
import { GridList, GridTile } from "material-ui/GridList";
import { Grid } from "material-ui/";
import IconButton from "material-ui/IconButton";
import Star from "material-ui/svg-icons/toggle/star-border";
import Dialog from "material-ui/Dialog";
import FlatButton from "material-ui/FlatButton";

class ImageResults extends Component {
  render() {
    //Not defining with let

    let imageListContent;
    const { images } = this.props;

    if (images) {
      imageListContent = (
        <GridList cols={5} cellHeight="auto">
          {images.map(img => (
            <GridTile
              title={img.original_title}
              key={img.id}
              subtitle={
                <span>
                  by <strong>{img.title}</strong>
                </span>
              }
              actionIcon={
                <IconButton>
                  <Star color="white" />
                </IconButton>
              }
            >
              <img
                src={`http://image.tmdb.org/t/p/w185/${img.poster_path}`}
                alt=""
              />
            </GridTile>
          ))}
        </GridList>
      );
    } else {
      imageListContent = null;
      //Spinner here probably
    }
    return <div> {imageListContent}</div>;
  }
}

ImageResults.propTypes = {
  images: PropTypes.array.isRequired
};

var gridTileStyle = {
  height: "100% !important",
  paddingTop: 5,
  backgroundColor: "#fff"
};

export default ImageResults;
