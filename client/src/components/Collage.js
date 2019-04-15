import React, { Component } from "react";
import {
  Carousel,
  Col,
  CarouselItem,
  CarouselControl,
  CarouselIndicators
} from "reactstrap";

const items = [
  {
    src: "image1.jpg",
    altText: "Slide 1",
    caption: "Slide 1"
  },
  {
    src: "2.png",
    altText: "Slide 2",
    caption: "Slide 2"
  },
  {
    src: "3.jpg",
    altText: "Slide 3",
    caption: "Slide 3"
  }
];

class Collage extends Component {
  constructor(props) {
    super(props);
    this.state = { activeIndex: 0 };
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
    this.goToIndex = this.goToIndex.bind(this);
    this.onExiting = this.onExiting.bind(this);
    this.onExited = this.onExited.bind(this);
  }

  onExiting() {
    this.animating = true;
  }

  onExited() {
    this.animating = false;
  }

  next() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === items.length - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  }

  previous() {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? items.length - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  }

  goToIndex(newIndex) {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  }

  render() {
    const { activeIndex } = this.state;

    const moviePosters = require.context("./images", true);
    //console.log(moviePosters("/1.jpg"));
    const slides = items.map(item => {
      return (
        <CarouselItem
          onExiting={this.onExiting}
          onExited={this.onExited}
          key={item.src}
        >
          <img src={moviePosters(`./${item.src}`)} alt="text" />
          <div className="textBox" />
        </CarouselItem>
      );
    });

    return (
      <Col>
        <Carousel
          activeIndex={activeIndex}
          next={this.next}
          previous={this.previous}
        >
          <div className="indicators">
            <CarouselIndicators
              items={items}
              activeIndex={activeIndex}
              onClickHandler={this.goToIndex}
            />
          </div>
          {slides}
          <CarouselControl
            direction="prev"
            directionText="Previous"
            onClickHandler={this.previous}
          />
          <CarouselControl
            direction="next"
            directionText="Next"
            onClickHandler={this.next}
          />
        </Carousel>
      </Col>
    );
  }
}

export default Collage;
