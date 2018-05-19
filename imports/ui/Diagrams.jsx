import React, {Component} from "react";
import BarChart from "./BarChart";
import WordCloud from "./WordCloud";

class Diagrams extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordCloud: false,
            expanded: false
        };
        this.wordsMap = [];
    }

    componentDidMount(){

        let intervalId = setInterval(()=>{
            this.wordsMap = [];
            this.countWord()
        }, 5000);
    }

    renderBarChart() {
        return (<BarChart data={this.props.users}/>)
    }

    countWord() {

        if(this.props.tweets){
            this.props.tweets.forEach((tweet) => {
                let wordsArray = tweet.body.split(/\s+/);
                wordsArray.forEach((word) => {
                    if (this.wordsMap.hasOwnProperty(word)) {
                        this.wordsMap[word]++;
                    }
                    else {
                        this.wordsMap[word] = 1;
                    }
                });
            });
            this.finalWordArray = Object.keys(this.wordsMap).map((key) => {
                return {
                    text: key,
                    size: this.wordsMap[key]
                };
            });
            this.finalWordArray.sort(function(a,b){
                return b.size - a.size;
            });
            this.finalWordArray = this.finalWordArray.slice(0,100);
        }

    }

    componentDidUpdate(prevProps) {

    }

    componentWillUpdate(nextProps){

    }


    render() {
        return (
            <div className="wall-background" style={{"backgroundColor": this.props.background}}>
                <div className="container-fluid">
                    <div className="row">
                        <div id = "activeUsers">
                            <h1 style={{"color": this.props.title}}> Top 5 Active Users </h1>
                            {this.renderBarChart()}
                        </div>
                    </div>
                    <div className="row rowChart">
                        <h1 style={{"color": this.props.title}}> Most used words </h1>

                        <br/>
                        <WordCloud finalWordArray = {this.finalWordArray}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Diagrams;