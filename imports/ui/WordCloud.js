var d3 = require("d3"),
    cloud = require("./d3.layout.cloud.js");


import React, {Component} from 'react';

//import cloud from "d3.layout.cloud";

class WordCloud extends Component {

    constructor(props){
        super(props);
        this.state={
            cont :0
        }
    }

    componentDidMount() {
        //this.redraw();
    }
    update(words) {
        this.leaderScale = d3.scaleLinear().range([10,100]);
        this.fill = d3.scaleOrdinal(d3.schemeCategory20c);
        this.layout = cloud()
            .size([300, 300])
            .words(words)
            .padding(5)
            .rotate(function () {
                return ~~(Math.random() * 2) * 90;
            })
            .font("Impact")
            .fontSize( (d)=> {
                return this.leaderScale(d.size);
            })
            .on("end", this.draw.bind(this));
        this.layout.start();

    }

    draw(words) {
        this.leaderScale.domain([d3.min(words, function(d){
            d.size;
        }),
    d3.max(words, function(d){
        return d.size;
        })]);
        var chart = d3.select("#wordCloud").append("svg")
            .attr("width", this.layout.size()[0])
            .attr("height", this.layout.size()[1])
            .append("g")
            .attr("transform", "translate(" + this.layout.size()[0] / 2 + "," + this.layout.size()[1] / 2 + ")")
            .selectAll("text")
            .data(words)
            .enter().append("text")
            .style("font-size", function (d) {
                return d.size + "px";
            })
            .style("font-family", "Impact")
            .style("fill", (d,i)=>{
                return this.fill(i);
            })
            .attr("text-anchor", "middle")
            .attr("transform", function (d) {
                return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
            })
            .text(function (d) {
                return d.text;
            });
    }

    redraw(){
        console.log(this.props.wordsList);
        if (this.props.wordsList && this.state.cont===0)
            if (this.props.wordsList.length > 0){
                this.update(this.props.wordsList);
                this.setState({cont:1});
            }


    }
    componentDidUpdate() {
        console.log(this.props.wordsList);
        if (this.props.wordsList && this.state.cont===0)
            if (this.props.wordsList.length > 100){
                this.update(this.props.wordsList);
                this.setState({cont:1});
            }
   }

    render() {
        return (
            <div id="wordCloud">

            </div>
        );
    }
}

export default WordCloud;
