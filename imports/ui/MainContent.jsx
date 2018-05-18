import React, {Component} from "react";

import Sidebar from "./Sidebar";
import WordCloud from "./WordCloud";

class MainContent extends Component {
    constructor(props) {
        super(props);
        this.state = {};
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

    render() {
        return (
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
        )
    }
}

export default MainContent;