import React, { Component, Fragment } from "react";
import { Grid, Paper, InputBase, IconButton, Icon } from "@material-ui/core";
import axios from "axios";
import MovieResult from "../MovieResult/Movie-Result";
import config from "../../config.json";
import MovieInfo from "../MovieInfo/MovieInfo";

class Search extends Component {
  state = {
    searchText: "",
    amount: 10,
    images: []
  };

  handleImageLoading() {
    this.setState({ imagesLoading: false });
  }
  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value });
    if (e.keyCode === 13) {
      if (this.state.searchText.length > 0) {
        axios
          .all([
            axios.get(
              `${config.themovieDB.apiUrl}?api_key=${
                config.themovieDB.apiKey
              }&query=${this.state.searchText}&sort_by=popularity.desc&page=1`
            ),
            axios.get(
              `${config.themovieDB.apiUrl}?api_key=${
                config.themovieDB.apiKey
              }&query=${this.state.searchText}&sort_by=popularity.desc&page=2`
            )
          ])
          .then(
            axios.spread((page1, page2) => {
              const array = page1.data.results.concat(page2.data.results);
              this.setState({ images: array });
            })
          )
          .catch(err => console.log(err));
      } else {
        return this.setState({ images: "" });
      }
    }
  };

  //onAmountChange = (e, index, value) => this.setState({ imageSizes: value });

  render() {
    return (
      <div>
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
              >
                <Icon>search</Icon>
              </IconButton>
            </Paper>
          </Grid>
        </Grid>
        <Grid container justify="center" alignItems="center">
          <Grid item sm={8}>
            <Paper style={styles.MainBody}>
              <Paper style={styles.inlineMainBody}>
                {this.state.images.length > 0 ? (
                  <MovieResult images={this.state.images} />
                ) : (
                  <Fragment>
                    {/* Make a nice component for no results*/}
                    <MovieInfo />
                  </Fragment>
                )}
              </Paper>
            </Paper>
          </Grid>
        </Grid>
      </div>
    );
  }
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
    //backgroundColor: "#f44336"
    //backgroundColor: "#434343"
  }
};

/*
<Grid container justify="center" alignItems="center">
          <TextField
            name="searchText"
            value={this.state.searchText}
            onChange={this.onTextChange}
            label="Serach for Movies"
            margin="normal"
          />
        </Grid>
*/

export default Search;
