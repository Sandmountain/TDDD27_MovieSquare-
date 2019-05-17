import React, { Component } from "react";
import * as d3 from "d3";

class PieChartLedgend extends Component {
  componentDidMount() {
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

    const data = [
      { label: "one", value: 20 },
      { label: "two", value: 50 },
      { label: "three", value: 30 }
    ];

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
      .attr("fill", function(i) {
        return color(i);
      });

    legend
      .append("text")
      .text(function(d) {
        return d.value + " %  " + d.label;
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
export default PieChartLedgend;
