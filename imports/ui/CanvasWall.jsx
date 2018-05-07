import React, {Component} from "react";
import * as d3 from "d3";
import {scaleOrdinal, schemeCategory20c} from 'd3-scale';

class CanvasWall extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
        console.log(props);
    }




    data = {
        nodes:  [
            {name: "prueba1", val: 5},
            {name: "prueba2", val: 2},
            {name: "prueba3", val: 1},
            {name: "prueba4", val: 4},
            {name: "prueba5", val: 6},
            {name: "prueba6", val: 3}
        ]
    };

    componentDidMount() {
        const canvas = d3.select("#network");
        this.ctx = canvas.node().getContext("2d");
        //this.setState({ctx:this.ctx});
        this.r = 3;
        this.width = +canvas.attr("width");
        this.height = +canvas.attr("height");
        this.update(this.props);

    }

    componentWillUpdate(newProps){
        this.update(newProps);
        this.simulation = d3.forceSimulation()
            .force("x", d3.forceX(this.width/2))
            .force("y", d3.forceY(this.height/2))
            .force("collide", d3.forceCollide(this.r+1))
            .on("tick", this.update(newProps));
        this.simulation.nodes(newProps);
    }

    update(props){
        console.log(props);

        /*props.rts.forEach((d) => {
            d.x = Math.random() * this.width;
            d.y = Math.random() * this.height;
        });*/
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.beginPath();
        props.rts.forEach((d)=>{
            this.ctx.moveTo(d.x, d.y);
            this.ctx.arc(d.x, d.y, this.r, 0, Math.PI * 2);
        });
        this.ctx.fill();
    }

    drawNode(d){

    }



    render() {
        return (
            <div className="networkCanva">
                <canvas id="network" width="1100" height="600"></canvas>
            </div>
        );
    }
}

export default CanvasWall;