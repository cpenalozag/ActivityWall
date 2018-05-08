import React, {Component} from "react";
import * as d3 from "d3";
import { scaleOrdinal, schemeCategory20c } from 'd3-scale';
import {Meteor} from 'meteor/meteor';
import {Switch, Route} from 'react-router-dom'

import CreateEvent from "./CreateEvent";
import Wall from "./Wall";

export default class BarChart extends Component{



    componentDidMount(){
        let myData = [5,10,30,40,50],
            margin = {top:10, bottom:10, left:10, right:10},
            width = "200",
            height = "600",
            barHeight = 20;

        let chart = d3.select("#chart")
            .attr("width", width)
            .attr("height", height)
            .append("g")
            .attr("transform", "translate(" +margin.left +","+margin.top+")");

        let yAxis = chart.append("a")
            .attr("class", "y axis")
            .attr("transform", "translate(0," + margin.top + ")" );

        let xScale = d3.scaleLinear()
            .range([0, width-margin.left-margin.right]);

        function update(myData){
            xScale.domain([0, d3.max(myData)]);

            let ps = chart.selectAll("rect")
                .data(myData);

            ps.enter()
                .append("rect")
                .merge(ps)
                .text((d)=>{return d;})
                .style("fill", "darkblue")
                .attr("x", 0)
                .attr("y", function(d,i){
                    return i * (barHeight + 1);
                })
                .attr("height", barHeight)
                .attr("width", (d)=>{
                    return xScale(d);
                });

            ps.exit()
                .remove();

            yAxis.call(d3.axisLeft(xScale));
        }

        update(myData);
    }

    render(){
        return(
            <div>
                <svg id = "chart"/>
            </div>
        )
    }
}