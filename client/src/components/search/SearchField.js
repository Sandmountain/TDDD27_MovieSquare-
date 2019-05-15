import React, { Component } from "react";
import { Grid, Paper, InputBase, IconButton, Icon } from "@material-ui/core";
import { connect } from "react-redux";
import { getSearchResults } from "../../actions/searchAction";

import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import { createHashHistory } from "history";

const homeLink = props => <Link to="/home" {...props} />;
export const history = createHashHistory();

class SearchField extends Component {
  state = {
    searchText: ""
  };

  render() {
    return (
      <Grid container justify="center" alignItems="center">
        <Grid item sm={4}>
          <Paper style={styles.root} color="secondary">
            <InputBase
              style={styles.inputField}
              name="searchText"
              value={this.state.searchText}
              onChange={this.onTextChange}
              onKeyDown={e => {
                if (e.keyCode === 13) {
                  this.onTextChange(e);
                }
              }}
              placeholder="Search Movies"
            />
            <IconButton
              style={styles.iconButton}
              color="secondary"
              aria-label="Search"
              component={homeLink}
              onClick={() => {
                this.onButtonPress();
              }}
            >
              <Icon>search</Icon>
            </IconButton>
          </Paper>
        </Grid>
      </Grid>
    );
  }

  onTextChange = e => {
    //To write and set value
    this.setState({ [e.target.name]: e.target.value });

    if (e.keyCode === 13) {
      //move to /home
      this.props.getSearchResults(this.state.searchText);
      this.props.history.push("/home");
    }
  };
  onButtonPress = () => {
    if (this.state.searchText.length > 0) {
      this.props.getSearchResults(this.state.searchText);
    }
  };
}

const styles = {
  root: {
    marginTop: "30px",
    marginBottom: "2px",
    display: "flex",
    alignItems: "center"
  },
  inputField: {
    paddingLeft: 20,
    width: 600,
    flex: 1
  },
  inlineMainBody: {
    width: "100%",
    minHeight: "1000px",
    padding: 4,
    backgroundColor: "white"
  },
  MainBody: {
    width: "100%",
    minHeight: "1000px",
    padding: "10px"
  }
};

const mapStateToProps = state => ({
  results: state.results,
  isSearching: state.loading
});

export default withRouter(
  connect(
    mapStateToProps,
    { getSearchResults }
  )(SearchField)
);
