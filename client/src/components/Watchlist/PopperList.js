import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import {
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Button,
  Popper,
  Fade,
  Paper,
  IconButton,
  Icon
} from "@material-ui/core";
import { getMovies, deleteMovie } from "../../actions/userWatchlistAction";
import { connect } from "react-redux";
import uuid from "uuid";

const styles = theme => ({
  typography: {
    padding: theme.spacing.unit * 2
  }
});

class PopperList extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };

  componentDidMount() {
    this.props.getMovies(this.props.userID);
  }
  /*
  componentDidUpdate(prevProps, previousState) {
    //console.log(prevProps); //this.props.movie.movies
    if (prevProps.movie.movies !== this.props.movie.movies) {
      this.props.getMovies();
    }
  }
  */

  onDeleteClick = id => {
    this.props.deleteMovie(this.props.userID, id);
  };

  handleClick = event => {
    this.props.getMovies(this.props.userID);
    const { currentTarget } = event;
    this.setState(state => ({
      anchorEl: currentTarget,
      open: !state.open
    }));
  };

  render() {
    const { anchorEl, open } = this.state;
    const id = open ? "simple-popper" : null;

    const { movies } = this.props.movie;
    //console.log(movies);
    return (
      <div>
        <Button
          aria-describedby={id}
          variant="contained"
          color="secondary"
          onClick={this.handleClick}
        >
          Toggle Popper
        </Button>
        <Popper id={id} open={open} anchorEl={anchorEl} transition>
          {({ TransitionProps }) => (
            <Fade {...TransitionProps} timeout={350}>
              <Paper>
                <List component="ul">
                  {movies.map(({ _id, movieTitle }) => (
                    <ListItem button key={uuid()}>
                      <ListItemText primary={movieTitle} />
                      <ListItemSecondaryAction>
                        <IconButton
                          color="secondary"
                          onClick={this.onDeleteClick.bind(this, _id)}
                        >
                          <Icon>playlist_add_check </Icon>
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Fade>
          )}
        </Popper>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  movie: state.movie,
  userID: state.auth.userID
});

PopperList.propTypes = {
  classes: PropTypes.object.isRequired,
  getMovies: PropTypes.func.isRequired,
  movie: PropTypes.object.isRequired,
  userID: PropTypes.string
};

export default connect(
  mapStateToProps,
  { getMovies, deleteMovie }
)(withStyles(styles)(PopperList));
