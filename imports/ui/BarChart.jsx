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


        let margin = {top: 40, bottom: 30, left: 40, right: 20};
            this.width = 300;
            this.height = 130;
            this.padding =20;
            active = d3.select(".activeUsers");

        console.log(active);
        this.barHeight = 20;

        this.color = d3.scaleOrdinal(d3.schemeCategory10);

        this.chart = d3.select("#chart")
            .attr("width", parseInt(this.width) + margin.left + margin.right)
            .attr("height", parseInt(this.height) + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate(" + margin.left + "," + margin.top + ")");


        this.xAxis = this.chart.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + (this.height-this.padding) + ")");

        this.xScale = d3.scaleLinear()
            .range([0, (parseInt(this.width)) - margin.left - margin.right]);

        this.yScale = d3.scaleLinear()
            .range([this.height, 0]);

        let p = d3.precisionFixed(0.5);
        this.f = d3.format("."+p + "f");



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
            let text = this.chart.selectAll("text")
                .data(myData);


            ps.enter()
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

            text.enter()
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
            text.exit()
                .remove();

            this.xAxis.call(d3.axisBottom(this.xScale).tickFormat(this.f));
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
