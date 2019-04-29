import React, { Component } from "react";
import TextField from "material-ui/TextField";
import SelectField from "material-ui/SelectField";
import MenuItem from "material-ui/MenuItem";
import axios from "axios";
import ImageResults from "../image-results/ImageResults";

class Search extends Component {
  state = {
    searchText: "",
    amount: 10,
    apiUrl: "https://api.themoviedb.org/3/search/movie",
    apiKey: "0d9a8d275e343ddfe2589947fe17d099",
    imageUrl: "http://image.tmdb.org/t/p/w185/",
    imageSizes: "w185",
    images: []
  };

  onTextChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {
      if (this.state.searchText.length > 0) {
        axios
          .get(
            `${this.state.apiUrl}?api_key=${this.state.apiKey}&query=${
              this.state.searchText
            }&sort_by=popularity.desc`
          )
          .then(res => this.setState({ images: res.data.results }))
          .catch(err => console.log(err));
      }
    });
  };

  onAmountChange = (e, index, value) => this.setState({ imageSizes: value });

  render() {
    //console.log(this.state.images);
    return (
      <div>
        <TextField
          name="searchText"
          value={this.state.searchText}
          onChange={this.onTextChange}
          floatingLabelText="Serach for Movies"
          style={{ paddingLeft: "10px", paddingRight: "10px" }}
          fullWidth={true}
        />
        <br />
        <SelectField
          name="imageSizes"
          floatingLabelText="Image Sizes"
          value={this.state.imageSizes}
          onChange={this.onAmountChange}
        >
          <MenuItem value={"w185"} primaryText="Small" />
          <MenuItem value={"w780"} primaryText="Medium" />
          <MenuItem value={"w1280"} primaryText="Large" />
        </SelectField>
        <br />
        {this.state.images.length > 0 ? (
          <ImageResults images={this.state.images} />
        ) : null}
      </div>
    );
  }
}

export default Search;
