var d3 = require("d3"),
    cloud = require("./d3.layout.cloud.js");


import React, {Component} from 'react';

class WordCloud extends Component {

    constructor(props) {
        super(props);
        this.state = {
            cont: 0
        };
        this.data = [];
    }

    wordCloud(selector) {

        //var fill = d3.scale.category20();
        this.fill = d3.scaleOrdinal(d3.schemeCategory20c);

        this.leaderScale = d3.scaleLinear().range([10, 100]);
        //Construct the word cloud's SVG element
        this.svg = d3.select(selector).append("svg")
            .attr("width", 500)
            .attr("height", 500)
            .append("g")
            .attr("transform", "translate(250,250)");


        //Draw the word cloud
        draw = ((words) => {
            this.leaderScale.domain([d3.min(words, function (d) {
                return d.size;
            }),
                d3.max(words, function (d) {
                    return d.size;
                })]);
            this.cloud = this.svg.selectAll("g text")
                .data(words, function (d) {
                    return d.text;
                });

            //Entering words
            this.cloud.enter()
                .append("text")
                .style("font-family", "Impact")
                .style("fill", (d, i) => {
                    return this.fill(i);
                })
                .attr("text-anchor", "middle")
                .style("font-size", (d) => {
                    return this.leaderScale(d.size);
                })
                .text(function (d) {
                    return d.text;
                });

            //Entering and existing words
            this.cloud
                .transition()
                .duration(600)
                .style("font-size", (d) => {
                    return this.leaderScale(d.size);
                })
                .attr("transform", function (d) {
                    return "translate(" + [d.x, d.y] + ")rotate(" + d.rotate + ")";
                })
                .style("fill-opacity", 1);

            //Exiting words
            this.cloud.exit()
                .transition()
                .duration(200)
                .style('fill-opacity', 1e-6)
                .attr('font-size', 1)
                .remove();
        });


        //Use the module pattern to encapsulate the visualisation code. We'll
        // expose only the parts that need to be public.
        return {

            //Recompute the word cloud for a new set of words. This method will
            // asycnhronously call draw when the layout has been computed.
            //The outside world will need to call this function, so make it part
            // of the wordCloud return value.
            update: (words) => {
                cloud().size([500, 500])
                    .words(words)
                    .padding(5)
                    .rotate(function () {
                        //return ~~(Math.random() * 2) * 90;
                        return 0;
                    })
                    .font("Impact")
                    .fontSize((d) => {
                        return this.leaderScale(d.size);
                    })
                    .on("end", draw)
                    .start();
            }
        }

    }


    //This method tells the word cloud to redraw with a new set of words.
    //In reality the new words would probably come from a server request,
    // user input or some other source.
    showNewWords(vis) {
        if (this.data)
            if (this.data.length > 0) {
                console.log("viz", this.data);
                vis.update(this.data);

            }
        setTimeout(() => {
            this.showNewWords(vis)
        }, 7000);

    }

    componentDidMount() {
        //Create a new instance of the word cloud visualisation.
        this.myWordCloud = this.wordCloud('#wordCloud');
        this.showNewWords(this.myWordCloud);
    }




    componentDidUpdate() {
        //Start cycling through the demo data
        //this.showNewWords(this.myWordCloud);
        this.data = this.props.finalWordArray;
    }


    render() {
        return (
            <div id="wordCloud">

            </div>
        );
    }
}

export default WordCloud;
