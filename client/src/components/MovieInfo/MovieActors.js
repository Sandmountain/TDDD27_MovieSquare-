import React, { Component } from "react";
import { Card, CardHeader, Typography, Grid, Avatar } from "@material-ui/core";

import uuid from "uuid";
class MovieActors extends Component {
  state = {
    imageLoading: true
  };
  render() {
    const cast = this.props.actors.slice(0, 24);

    //
    return (
      <div style={styles.root}>
        {cast.length > 0 ? (
          <Grid container style={{ marginTop: 4 }}>
            {cast.map(actor => (
              <Grid item style={{ width: "100%" }} key={uuid()}>
                <Card square={true} style={styles.card} key={uuid()}>
                  <CardHeader
                    style={{ padding: 8 }}
                    avatar={
                      <Avatar
                        style={{ width: "60px", height: "60px" }}
                        src={`http://image.tmdb.org/t/p/w185/${
                          actor.profile_path
                        }`}
                        alt="Actor"
                      />
                    }
                    title={actor.name}
                    subheader={<span>as: {actor.character}</span>}
                  />
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Typography
            align="center"
            color="inherit"
            style={{ paddingTop: 20, paddingBottom: 20 }}
          >
            No actors on record
          </Typography>
        )}
      </div>
    );
  }
}
const styles = {
  root: {
    minWidth: "100%"
  },
  card: {
    marginBottom: "4px"
  }
};

export default MovieActors;

/*import React, { Component } from "react";
import {
  GridList,
  GridListTile,
  GridListTileBar,
  Typography
} from "@material-ui/core";
import PropTypes from "prop-types";

class MovieActors extends Component {
  state = {
    imageLoading: true
  };
  render() {
    const cast = this.props.actors.slice(0, 24);
    const length = cast.length > 5 ? 5 : cast.length;
    const { classes } = this.props;
    console.log(cast);
    //
    return (
      <div style={styles.root}>
        {cast.length > 0 ? (
          <GridList cols={length} cellHeight="auto" style={{ marginTop: 0 }}>
            {cast.map(actor => (
              <GridListTile key={actor.id}>
                <div className="vignette">
                  <img
                    style={
                      !this.state.imageLoading
                        ? { cursor: "pointer", height: "100%", width: "100%" }
                        : { display: "none", height: "100%", width: "100%" }
                    }
                    className="imageDiv"
                    src={`http://image.tmdb.org/t/p/w185/${actor.profile_path}`}
                    alt="Actor"
                    onLoad={() => this.setState({ imageLoading: false })}
                    onClick={() => {
                      this.handleOpen();
                      this.setState({ youTubeKey: actor.key });
                    }}
                    onError={e => {
                      this.setState({ imageLoading: false });

                      e.onError = null;
                      e.target.src = require("../../images/error.png");
                    }}
                  />
                </div>
                <GridListTileBar
                  style={{ height: "35px" }}
                  title={actor.name}
                  subtitle={<span>as: {actor.character}</span>}
                >
                  <Typography />
                </GridListTileBar>
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
      </div>
    );
  }
}
const styles = {
  root: {
    minWidth: "100%",
    marginTop: "2px"
  }
};

MovieActors.propTypes = {
  classes: PropTypes.object.isRequired
};

export default MovieActors;
*/
