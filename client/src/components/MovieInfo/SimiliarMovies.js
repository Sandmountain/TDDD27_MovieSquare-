import React from "react";
import {
  GridListTile,
  GridListTileBar,
  Icon,
  IconButton,
  GridList
} from "@material-ui/core";
import PropTypes from "prop-types";
import uuid from "uuid";

function SimiliarMovies(similar) {
  //cellHeight="auto"
  let similarResults;

  similar.similiar
    ? (similarResults = similar.similiar.results.slice(0, 5))
    : (similarResults = null);

  console.log(similarResults);
  return similar.similiar ? (
    <div>
      <GridList cols={5}>
        {similarResults.map(img => (
          <GridListTile key={uuid()}>
            <img
              src={`http://image.tmdb.org/t/p/w185/${img.poster_path}`}
              alt=""
            />
            <GridListTileBar
              title={img.title}
              key={img.id}
              subtitle={<span>Year: {img.release_date}</span>}
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
  ) : (
    <div />
  );
}

SimiliarMovies.propTypes = {
  similar: PropTypes.array
};

export default SimiliarMovies;
