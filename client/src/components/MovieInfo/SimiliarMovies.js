import React from "react";
import {
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton,
  GridList
} from "@material-ui/core";
import PropTypes from "prop-types";

function SimiliarMovies(similiar) {
  //cellHeight="auto"
  return (
    <div>
      <GridList cols={5}>
        {similiar.similiar.map(img => (
          <GridListTile key={img.id}>
            <img src={img.imageSRC} alt="" />
            <GridListTileBar
              title={img.title}
              key={img.id}
              subtitle={
                <span>
                  by <strong>{img.id}</strong>
                </span>
              }
              actionIcon={
                <IconButton color="secondary">
                  <Icon>playlist_add</Icon>
                </IconButton>
              }
            />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

SimiliarMovies.propTypes = {
  similiar: PropTypes.array.isRequired
};

export default SimiliarMovies;
