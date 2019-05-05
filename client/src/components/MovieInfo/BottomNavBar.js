import React, { Component } from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";

import Icon from "@material-ui/core/Icon";

const styles = theme => ({
  root: {
    minWidth: "100%"
  },
  actionItemStyles: {
    "&$selected": {
      color: theme.palette.secondary.main
    }
  },
  selected: {}
});

class BottomNavBar extends Component {
  state = {
    value: "comment"
  };

  handleChange = (event, value) => {
    this.setState({ value });
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;
    return (
      <div>
        <BottomNavigation
          color="light"
          showLabels
          value={value}
          onChange={this.handleChange}
          className={classes.root}
        >
          <BottomNavigationAction
            label="Comments"
            value="comment"
            classes={{
              root: classes.actionItemStyles,
              selected: classes.selected
            }}
            icon={<Icon>comment</Icon>}
          />
          <BottomNavigationAction
            label="Reviews"
            value="reviews"
            classes={{
              root: classes.actionItemStyles,
              selected: classes.selected
            }}
            icon={<Icon>rate_review</Icon>}
          />
          <BottomNavigationAction
            label="Movies"
            value="movies"
            classes={{
              root: classes.actionItemStyles,
              selected: classes.selected
            }}
            icon={<Icon>movies</Icon>}
          />
          <BottomNavigationAction
            label="Actors"
            value="folder"
            classes={{
              root: classes.actionItemStyles,
              selected: classes.selected
            }}
            icon={<Icon>recent_actors</Icon>}
          />
        </BottomNavigation>
      </div>
    );
  }
}

BottomNavBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(BottomNavBar);
