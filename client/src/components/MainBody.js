import React, { Component } from "react";
import { Container, Row, Col } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Movie from "./Movie";

class MainBody extends Component {
  constructor() {
    super();
    this.state = {
      movies: [
        {
          src: "cover1.jpg",
          title: "Terminator 3: Rise of the Machines",
          text:
            "A cybernetic warrior from a post-apocalyptic future travels back in time to protect a 25-year old drifter and his future wife from a most advanced robotic assassin and to ensure they both survive a nuclear attack.",
          rating: 6.3
        },
        {
          src: "cover2.jpg",
          title: "Mina jag & Irene",
          text:
            "A nice-guy cop with dissociative identity disorder must protect a woman on the run from a corrupt ex-boyfriend and his associates.",
          rating: 6.6
        },
        {
          src: "cover3.jpg",
          title: "Face/Off",
          text:
            "In order to foil an extortion plot, an FBI agent undergoes a facial transplant surgery and assumes the identity and physical appearance of a terrorist, but the plan turns from bad to worse when the same terrorist impersonates the FBI agent.",
          rating: 7.3
        },
        {
          src: "cover3.jpg",
          title: "Face/Off",
          text:
            "In order to foil an extortion plot, an FBI agent undergoes a facial transplant surgery and assumes the identity and physical appearance of a terrorist, but the plan turns from bad to worse when the same terrorist impersonates the FBI agent.",
          rating: 7.3
        },
        {
          src: "cover1.jpg",
          title: "Terminator 3: Rise of the Machines",
          text:
            "A cybernetic warrior from a post-apocalyptic future travels back in time to protect a 25-year old drifter and his future wife from a most advanced robotic assassin and to ensure they both survive a nuclear attack.",
          rating: 6.3
        },
        {
          src: "cover2.jpg",
          title: "Mina jag & Irene",
          text:
            "A nice-guy cop with dissociative identity disorder must protect a woman on the run from a corrupt ex-boyfriend and his associates.",
          rating: 6.6
        }
      ]
    };
  }

  render() {
    let movieCards = this.state.movies.map(movie => {
      return (
        <Col lg="2">
          <Movie movie={movie} />
        </Col>
      );
    });

    return (
      <Col>
        <div className="bg-dark" style={MainBodyStyle}>
          <Row>{movieCards}</Row>
        </div>
      </Col>
    );
  }
}

const MainBodyStyle = {
  height: "600px",
  padding: "1rem",
  borderRadius: "5px"
};

export default MainBody;
