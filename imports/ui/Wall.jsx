import React, {Component} from "react";
import {Tweets} from "../api/tweets";
import {withTracker} from 'meteor/react-meteor-data';
import {StreamUsers} from "../api/streamUsers.js";
import {TweetsAgg} from "../api/tweetsAggregated.js";
import BarChart from "./BarChart.jsx";
import Nav from "./Nav";
import BubbleChart from "./BubbleChart";
import WordCloud from "./WordCloud";


class Wall extends Component {
    constructor(props) {
        super(props);
        this.state = {};
        this.wordsMap = {};
    }

    countWord(){

        this.props.tweets.forEach((tweet)=>{
            let wordsArray = tweet.body.split(/\s+/);
            wordsArray.forEach((word)=>{
                if(this.wordsMap.hasOwnProperty(word)){
                    this.wordsMap[word]++;
                }
                else{
                    this.wordsMap[word]=1;
                }
            });
        });
        this.finalWordArray = Object.keys(this.wordsMap).map((key)=>{
            return{
                text:key,
                size:this.wordsMap[key]
            };
        });
        //console.log(this.finalWordArray);
    }


    renderTweets() {
        return this.props.tweets.map((tweet) => {
            return (
                <Tweet key={tweet._id} tweet={tweet}/>
            )
        });

    }

    renderBarChart() {
        return (<BarChart data={this.props.users}/>)
    }
    componentDidUpdate(){
        this.countWord();
    }

    render() {
        console.log(this.props);
        return (
            <div className="wall-background" style={{"backgroundColor": this.props.background}}>
                <Nav hashtag = {this.props.location.state.hashtag} title ={this.props.title} />
                <div className="">
                    <div className="row">
                        <div className="col-md-4 col-lg-4">
                            <div className="row">
                                <div id = "activeUsers">
                                    <h1 style={{"color": this.props.title}}> Top 5 Active Users </h1>
                                    {this.renderBarChart()}
                                </div>
                            </div>
                            <div className="row rowChart">
                                <h1 style={{"color": this.props.title}}> Top 5 Retweets Users </h1>
                                <WordCloud wordsList= {this.finalWordArray}/>
                            </div>
                        </div>

                        <div className="col-md-8 col-lg-8">
                            <div className="row">

                                {this.renderTweets()}


                            </div>

                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

//export default Wall;
export default withTracker((props) => {
    const hashtag = props.location.state.hashtag;
    const background = props.location.state.background;
    const title = props.location.state.title;
    const body = props.location.state.body;
    Meteor.subscribe('Tweets', hashtag);
    Meteor.subscribe('StreamUser', hashtag);
    Meteor.subscribe('MostRts', hashtag);
    return {
        tweets: Tweets.find({}, {sort: {date: -1}, limit: 30}).fetch(),
        users: StreamUsers.find({},{sort:{count:-1}, limit:5}).fetch(),
        rts: TweetsAgg.find({}).fetch(),
        background: background,
        title: title,
        body: body
    };
})(Wall);

class Tweet extends Component {
    render() {
        return (
            <div className="column">
                <div className="tweet">
                    <div className="tweet--user">
                        <img className="tweet--user-avatar" src={this.props.tweet.avatar}
                             alt={`${this.props.screenname} profile picture`}/>
                        <div
                            className="tweet--user-name">{this.props.tweet.author}<span>{`@${this.props.tweet.screenname}`}</span>
                        </div>
                    </div>
                    <p className="tweet--body">{this.props.tweet.body}</p>
                    <div className="tweet--time">{this.props.tweet.date}</div>
                </div>
            </div>
        );
    }
}