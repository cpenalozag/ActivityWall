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
        this.state={
            users:props.users
        }
    }

    componentDidMount() {


        let margin = {top: 40, bottom: 30, left: 40, right: 20},
            width = "300",
            height = "130",
            active = d3.select(".activeUsers");

        console.log(active);
        this.barHeight = 20;

        this.color = d3.scaleOrdinal(d3.schemeCategory10);

        this.chart = d3.select("#chart")
            .attr("width", parseInt(width) + margin.left + margin.right)
            .attr("height", parseInt(height) + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        this.xAxis = this.chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")");

        this.xScale = d3.scaleLinear()
            .range([0, (parseInt(width)) - margin.left - margin.right]);

        this.yScale = d3.scaleLinear()
            .range([height, 0]);



    }

    update(myData) {
        {

            this.xScale.domain([0, d3.max(myData, function (d) {
                return d.count
            })]);
            this.yScale.domain(myData.map(function (d) {
                return d.count
            }));

            //this.axis = d3.select(".x.axis").transition().duration(3).call(this.xAxis);
            //this.chart.select(".yScale.axis").transition().call(this.yAxis);

            let ps = this.chart.selectAll("rect")
                .data(myData);

            ps.enter()
                .append("rect")
                .merge(ps)
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
            /*.on("mouserover", tip.show)
            .on("mouseout", tip.hide);*/

            ps.exit()
                .remove();

            this.xAxis.call(d3.axisBottom(this.xScale));
        }
    }

    componentDidUpdate(){
        console.log(this.props);
        this.update(this.props.data);
    }


    render() {
        return (
            <div>
                <svg id="chart"/>
            </div>
        )
    }
}
