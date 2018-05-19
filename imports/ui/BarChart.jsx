import React, {Component} from "react";
import * as d3 from "d3";

export default class BarChart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: props.users,
            datos: []
        }
    }

    componentDidMount() {


        this.margin = {top: 0, bottom: 0, left: 0, right: 0};
        this.width = 500;
        this.height = 300;
        this.padding = 20;
        this.categoryIndent = 4 * 15 + 5;
        this.barHeight = 20;

        this.xScale = d3.scaleLinear()
            .range([0, this.width]);

        this.yScale = d3.scaleBand().rangeRound([0, this.height]).padding(0.1).paddingOuter(0);
        //.range([this.height, 0]);

        this.color = d3.scaleOrdinal(d3.schemeCategory10);

        this.svg = d3.select("#chart")
            .append("svg")
            .attr("width", parseInt(this.width) + this.margin.left + this.margin.right)
            .attr("height", parseInt(this.height) + this.margin.top + this.margin.bottom)
            .append("g")
            .attr("id", "elements")
            .attr("transform", "translate(" + this.margin.left + "," + this.margin.top + ")");

    }

    update(myData) {
        {

            this.xScale.domain([0, d3.max(myData, function (d) {
                return d.count;
            })]);
            this.yScale.domain(myData.sort(function (a, b) {
                return b.count - a.count;
            }).map((d) => {
                return d.name;
            }));

            ///ENTER

            //Create chart row and move to below the bottom of the chart
            let chartRow = this.svg.selectAll("g.chartRow")
                .data(myData, (d) => {
                    return d.name;
                });

            let newRow = chartRow
                .enter()
                .append("g")
                .attr("class", "chartRow")
                .attr("transform", "translate(0," + parseInt(parseInt(this.height) + parseInt(this.margin.top)) + ")");

            //Add rectangles
            newRow.insert("rect")
                .attr("class", "bar")
                .attr("x", 0)
                .attr("opacity", 0)
                .attr("height", this.yScale.bandwidth())
                .attr("width", (d) => {
                    return this.xScale(d.count);
                })
                .style("fill", (d) => {
                    return this.color(d.count);
                });


            //Add value labels
            newRow.append("text")
                .attr("class", "label")
                .attr("y", this.yScale.bandwidth() / 2)
                .attr("x", 0)
                .attr("opacity", 0)
                .attr("dy", ".35em")
                .attr("dx", "0.5em")
                .text(function (d) {
                    return d.count;
                });

            //Add Headlines
            newRow.append("text")
                .attr("class", "category")
                .attr("text-overflow", "ellipsis")
                .attr("y", this.yScale.bandwidth() / 2)
                .attr("x", this.categoryIndent)
                .attr("opacity", 0)
                .attr("dy", ".35em")
                .attr("dx", "0.5em")
                .text(function (d) {
                    return d.name;
                })
                .on("click", (d) => {
                    window.open(d.profileURL,"_blank");
                });

            //////////
            //UPDATE//
            //////////

            //Update bar widths
            chartRow.select(".bar").transition()
                .duration(300)
                .attr("width", (d) => {
                    return this.xScale(d.count);
                })
                .attr("opacity", 1)
                .style("fill", (d) => {
                    return this.color(d.count)
                });

            //Update data labels
            chartRow.select(".label").transition()
                .duration(300)
                .attr("opacity", 1)
                .tween("text", function (d) {
                    let i = d3.interpolate(+this.textContent.replace(/\,/g, ''), +d.count);
                    return (t) => {
                        this.textContent = Math.round(i(t));
                    };
                });

            //Fade in categories
            chartRow.select(".category").transition()
                .duration(300)
                .attr("opacity", 1);

            ////////
            //EXIT//
            ////////

            //Fade out and remove exit elements
            chartRow.exit().transition()
                .style("opacity", "0")
                .attr("transform", "translate(0," + parseInt(parseInt(this.height) + parseInt(this.margin.top) + parseInt(this.margin.bottom)) + ")")
                .remove();

            ////////////////
            //REORDER ROWS//
            ////////////////

            let delay = function (d, i) {
                return 200 + i * 30;
            };

            chartRow.transition()
                .delay(delay)
                .duration(900)
                .attr("transform", (d) => {
                    return "translate(0," + this.yScale(d.name) + ")";
                });

        }
    }

    componentDidUpdate(nextProps) {
        this.update(this.props.data);

    }


    render() {
        return (
            <div>
                <div id="chart"/>
            </div>
        )
    }
}
