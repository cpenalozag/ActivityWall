import React, {Component} from "react";
import * as d3 from "d3";
//import {scaleOrdinal, schemeCategory20c} from 'd3-scale';
import tip from "d3-tip";

import {Meteor} from 'meteor/meteor';
import {Switch, Route} from 'react-router-dom'

import CreateEvent from "./CreateEvent";
import Wall from "./Wall";

export default class BarChart extends Component {


    componentDidMount() {
        let myData = [
                {user: "prueba1", tweets: 100},
                {user: "prueba2", tweets: 60},
                {user: "prueba3", tweets: 50},
                {user: "prueba4", tweets: 20},
                {user: "prueba5", tweets: 10},
                {user: "prueba6", tweets: 5},

            ],
            margin = {top: 40, bottom: 30, left: 40, right: 20},
            width = "300",
            height = "140",
            barHeight = 20;

        let color = d3.scaleOrdinal(d3.schemeCategory10);

        let chart = d3.select("#chart")
            .attr("width", parseInt(width)+margin.left + margin.right)
            .attr("height", parseInt(height) + margin.top+margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

        /*let tip = tip()
            .attr("class", "d3-tip")
            .offset([-10, 0])
            .html(function (d) {
                return "<strong> data: </strong> <span style='color:red'>" + d.tweets + "</span>";
            });

        chart.call(tip);*/

        let xAxis = chart.append("a")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height +")");

        let xScale = d3.scaleLinear()
            .range([0, (parseInt(width)) - margin.left - margin.right]);

        let yScale = d3.scaleLinear()
            .range([height,0]);

        function update(myData) {
            xScale.domain([0,d3.max(myData,function(d){return d.tweets})]);
            yScale.domain(myData.map(function(d){return d.tweets}));

            let ps = chart.selectAll("rect")
                .data(myData);

            ps.enter()
                .append("rect")
                .merge(ps)
                .text((d) => {
                    return d.user;
                })
                .style("fill", (d)=>{return color(d.tweets)})
                .attr("x", 0)
                .attr("y", function (d, i) {
                    return i * (barHeight + 1);
                })
                .attr("height", barHeight)
                .attr("width", (d) => {
                    return xScale(d.tweets);
                });
                /*.on("mouserover", tip.show)
                .on("mouseout", tip.hide);*/

            ps.exit()
                .remove();

            xAxis.call(d3.axisBottom(xScale));
        }

        update(myData);
    }

    render() {
        return (
            <div>
                <svg id="chart"/>
            </div>
        )
    }
}