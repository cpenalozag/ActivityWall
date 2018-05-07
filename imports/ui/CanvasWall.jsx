import React, {Component} from "react";
import * as d3 from "d3";
import {scaleOrdinal, schemeCategory20c} from 'd3-scale';

class CanvasWall extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
        console.log(props);
    }


    componentDidUpdate() {
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
        const canvas = d3.select("#network");
        ctx = canvas.node().getContext("2d");
        //this.setState({ctx:this.ctx});
        r = 10;
        width = canvas.attr("width");
        height = canvas.attr("height");
        simulation = d3.forceSimulation()
            .force("x", d3.forceX(width))
            .force("y", d3.forceY(height))
            .force("collide", d3.forceCollide(r+10))
            .on("tick",update);

        simulation.nodes(data.nodes);


        function update(){

            /*props.rts.forEach((d) => {
                d.x = Math.random() * this.width;
                d.y = Math.random() * this.height;
            });*/
            ctx.clearRect(0, 0, this.width, this.height);
            ctx.beginPath();
            data.nodes.forEach((d)=>{
                ctx.moveTo(d.x, d.y);
                ctx.arc(d.x, d.y, r, 0, Math.PI * 2);
            });
            ctx.fill();
        }

        update(data);

    }

    /*componentWillUpdate(newProps){
        this.update(newProps);


    }*/



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