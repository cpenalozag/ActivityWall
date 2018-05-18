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
        this.wordsMap = {};
    }

    renderBarChart() {
        return (<BarChart data={this.props.users}/>)
    }

    countWord() {

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
        //console.log(this.finalWordArray);
    }

    renderWordCloud() {
        console.log("In");
        this.setState({wordCloud: true});
    }

    componentDidUpdate() {
        this.countWord();
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
                        {/*{this.state.wordCloud ? <WordCloud wordsList = {this.finalWordArray.bind(this)}/>:""}*/}
                        <WordCloud wordsList = {this.finalWordArray}/>
                    </div>
                </div>
            </div>
        );
    }
}

export default Diagrams;