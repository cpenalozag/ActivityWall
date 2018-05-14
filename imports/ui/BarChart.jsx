import React, {Component} from "react";
import * as d3 from "d3";
//import {scaleOrdinal, schemeCategory20c} from 'd3-scale';
import tip from "d3-tip";

import {Meteor} from 'meteor/meteor';
import {Switch, Route} from 'react-router-dom'

import CreateEvent from "./CreateEvent";
import Wall from "./Wall";

export default class BarChart extends Component {
    constructor(props) {
        super(props);
        console.log(props);
        this.state = {
            users: props.users,
            datos: []
        }
    }

    componentDidMount() {


        this.margin = {top: 0, bottom: 0, left: 0, right: 0};
        this.width = 300;
        this.height = 130;
        this.padding = 20;
        active = d3.select(".activeUsers");
        this.categoryIndent = 4 * 15 + 5;

        console.log(active);
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

        /*this.g = this.chart
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");*/


        /*this.xAxis = this.chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (this.height-this.padding) + ")");*/


        //let p = d3.precisionFixed(0.5);
        //this.f = d3.format("."+p + "f");


    }

    update(myData) {
        {


            this.xScale.domain([0, d3.max(myData, function (d) {
                return d.count;
            })]);
            this.yScale.domain(myData.sort(function (a, b) {
                return b.count - a.count;
            }).map((d) => {
                return d.screenname;
            }));

            //this.axis = d3.select(".x axis").transition().duration(3).call(this.xAxis);
            //this.chart.select(".yScale.axis").transition().call(this.yAxis);


            ///ENTER

            //Create chart row and move to below the bottom of the chart
            let chartRow = this.svg.selectAll("g.chartRow")
                .data(myData, (d) => {
                    return d.screenname;
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
                    return this.color(d.count)
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
                    return d.screenname
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
                .tween("text", function(d) {
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
                    return "translate(0," + this.yScale(d.screenname) + ")";
                });


            /*
            let ps = this.chart.selectAll("rect")
                .data(myData);
            let text = this.chart.selectAll("text")
                .data(myData);

            let xAxis = this.chart.selectAll("#x-axis");

            this.g.append("g")
                .attr("class", "x-axis")
                .attr("transform", "translate(0," + this.height + ")")
                .call(d3.axisBottom(this.xScale))
                .append("text")
                .attr("y", 30)
                .attr("x", 650)
                .attr("dy", "0.5em")
                .style("fill", "black")
                .text("count");

            this.g.append("g")
                .attr("class", "y-axis")
                .call(d3.axisLeft(this.yScale));

            this.g.selectAll(".bar")
                .data(myData)
                .enter()
                .append("rect")
                .attr("class", "bar")
                .attr("x", 0)
                .attr("y", (d)=>{
                    return this.yScale(d.screenname);
                })
                .attr("width", (d)=>{
                    return this.xScale(d.count);
                })
                .style("fill", "#2ca25f");
            /*ps.enter()
                .append("rect")
                .merge(ps)
                .transition()
                .delay((d,i)=>{
                    return i /myData.length* 300;
                })
                .duration(1000)
                .text((d) => {
                    return d.screenname;
                })
                .style("fill", (d) => {
                    return this.color(d.count)
                })
                .attr("x", 0)
                .attr("y", (d, i)=> {
                    return i * (this.barHeight + 1);
                })
                .attr("height", this.barHeight)
                .attr("width", (d) => {
                    return this.xScale(d.count);
                });
            /*.on("mouseover", (d)=>{
                d3.select(this)
                    .attr("fill", yellow);
            });
            /*.on("mouseout", tip.hide);*/

            /*text.enter()
                .append("text")
                .merge(text)
                .text((d)=>{
                    return d.screenname;
                })
                .attr("x", (d,i)=>{
                    return this.xScale(d.count)+4;
                })
                .attr("y", (d,i)=>{
                    return i*(this.barHeight+1)+18;
                })
                .attr("font-family", "sans-serif")
                .attr("font-size","12px");

            ps.exit()
                .transition()
                .duration(500)
                .remove();

            this.xAxis.call(d3.axisBottom(this.xScale));
            text.exit()
                .remove();*/


        }
    }

    componentDidUpdate() {
        console.log(this.props);
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
