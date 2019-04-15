import React, { Component } from "react";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";
import { faImages } from "@fortawesome/free-solid-svg-icons";

class Movie extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const images = require.context("./images", true);

    return (
      <div>
        <Card style={CardStyle}>
          <CardImg
            top
            width="50%"
            height="50%"
            src={images(`./${this.props.movie.src}`)}
            alt="Card image cap"
          />
          <div style={movieCardBody}>
            <CardTitle style={TitleStyle}>
              {reduceString(this.props.movie.title)}
            </CardTitle>
          </div>
          {/*<CardSubtitle>Card subtitle</CardSubtitle>*/}
          {/*<CardText style={textStyle}>
              {reduceString(this.props.movie.text)}
      </CardText>*/}
        </Card>
      </div>
    );
  }
}

const movieCardBody = {
  textAlign: "center",
  color: "white",
  opacity: "0.8",
  paddingTop: "5px",
  cursor: "pointer"
};

const CardStyle = {
  maxHeight: "177.5px",
  minHeight: "177.5px"
};

const TitleStyle = {
  fontWeight: "bold",
  fontSize: "10pt"
};

const textStyle = {
  fontSize: "8pt"
};

function reduceString(stringToReduce) {
  if (stringToReduce.length >= 16) return stringToReduce.substr(0, 16) + "...";
  else return stringToReduce;
}

export default Movie;
