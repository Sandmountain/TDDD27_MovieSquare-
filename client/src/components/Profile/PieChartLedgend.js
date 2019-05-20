import React, { Component } from "react";
import { getMovies } from "../../actions/userWatchlistAction";
import * as d3 from "d3";
import { connect } from "react-redux";
import PropTypes from "prop-types";

class PieChartLedgend extends Component {
  static propTypes = {
    userID: PropTypes.string.isRequired,
    getMovies: PropTypes.func.isRequired,
    movies: PropTypes.array.isRequired,
    loading: PropTypes.bool.isRequired
  };

  componentDidMount() {
    this.props.getMovies(this.props.userID);
  }

  componentDidUpdate(prevProps) {
    if (prevProps.loading !== this.props.loading) {
      if (!this.props.loading) {
        if (this.props.movies) {
          this.drawChart();
        }
      }
    }
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

    const data = favoriteGenre(this.props.movies);

    const width = 300;
    const height = 300;

    const svg = d3
      .select("#PieChartDiv")
      .append("svg")
      .data([data])
      .attr("width", width)
      .attr("height", height)
      .append("g");

    const ledgends = svg.append("g").attr("transform", "translate(170,-15)");
    const legend = ledgends
      .selectAll("ledgends")
      .data(data)
      .enter()
      .append("g")
      .attr("class", "ledgend")
      .attr("transform", function(d, i) {
        return "translate(0," + (i + 1) * 25 + ")";
      });

    legend
      .append("rect")
      .attr("width", 20)
      .attr("height", 20)
      .attr("fill", function(d, i) {
        return color(i);
      });

    legend
      .append("text")
      .text(function(d) {
        return d.key + ": " + d.val;
      })
      .attr("fill", "black")
      .style("font-size", 12)
      .attr("x", 25)
      .attr("y", 15);
  }

  render() {
    return <div id={"#PieChartLedgend"} />;
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
    //console.log("dataArray", dataArray[1].key);

    return dataArray;
  } else return null;
};

const mapStateToProps = state => ({
  movies: state.movie.movies,
  userID: state.auth.userID,
  loading: state.movie.loading
});

export default connect(
  mapStateToProps,
  { getMovies }
)(PieChartLedgend);
