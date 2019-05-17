import React, { Component } from "react";
import * as d3 from "d3";
import { getMovies } from "../../actions/userWatchlistAction";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PieChart extends Component {
  state = {
    isLoading: true
  };

  static propTypes = {
    userID: PropTypes.string.isRequired,
    getMovies: PropTypes.func.isRequired,
    movies: PropTypes.object.isRequired
  };

  componentDidMount() {
    this.props.getMovies(this.props.userID);
    console.log(this.props.movies);
    this.drawChart();
  }

  drawChart() {
    var color = d3
      .scaleOrdinal()
      .range([
        "#BBDEFB",
        "#90CAF9",
        "#64B5F6",
        "#42A5F5",
        "#2196F3",
        "#1E88E5",
        "#1976D2"
      ]);
    //const data = [12, 5, 6, 6, 9, 10];
    const favGenre = favoriteGenre(this.props.movies);

    const width = 300;
    const height = 300;
    const radius = Math.min(width, height) / 2;

    const svg = d3
      .select("#PieChartDiv")
      .append("svg")
      .data([favGenre])
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + radius + "," + radius + ")");

    const arc = d3
      .arc()
      .outerRadius(radius)
      .innerRadius(0);

    const pie = d3.pie().value(function(d) {
      return d.val;
    });

    const arcs = svg
      .selectAll("g.slice")
      .data(pie)
      .enter()
      .append("svg:g")
      .attr("class", "slice");

    arcs
      .append("svg:path")
      .attr("fill", function(d, i) {
        return color(i);
      })
      .attr("stroke", "white")
      .attr("stroke-width", "2px")
      .attr("d", arc);

    arcs
      .append("svg:text")
      .attr("transform", function(d) {
        d.innerRadius = 0;
        d.outerRadius = radius;
        return "translate(" + arc.centroid(d) + ")";
      })
      .attr("text-anchor", "middle")
      .text(function(d, i) {
        return d[i].key;
      });
  }

  render() {
    const { movies } = this.props.movies;
    console.log(movies);

    return <div id={"#PieChart"} />;
  }
}

const favoriteGenre = movies => {
  if (movies) {
    // Tar ut de olika genrerna från varje film och lägger de i en gemensam array.
    const genreList = [].concat.apply(
      [],
      movies.map(genres => genres.movieGenre)
    );

    // Räknar antalet gånger varje genre förekommer.
    let counts = genreList.reduce((a, c) => {
      a[c] = (a[c] || 0) + 1;
      return a;
    }, {});

    // Returnerar genren som förekommer flest gånger.
    let maxCount = Math.max(...Object.values(counts));

    // Retunerar de genrerna som förekommer flest gånger.
    let mostFrequent = Object.keys(counts).filter(k => counts[k] === maxCount);

    const favoriteGenreFreq = mostFrequent.reduce((acc, elem) => {
      acc[elem] = maxCount;
      return acc;
    }, {});

    const tempArray = Object.values(favoriteGenreFreq);
    const dataArray = tempArray.map((d, i) => ({
      key: Object.keys(favoriteGenreFreq)[i],
      val: d
    }));

    return dataArray;
  } else return null;
};

const mapStateToProps = state => ({
  movies: state.movie,
  userID: state.auth.userID
});

export default connect(
  mapStateToProps,
  { getMovies }
)(PieChart);
