import React, {Component} from "react";
import {Tweets} from "../api/tweets";
import {withTracker} from 'meteor/react-meteor-data';
import {StreamUsers} from "../api/streamUsers.js";
import {TweetsAgg} from "../api/tweetsAggregated.js";
import BarChart from "./BarChart.jsx";


class Wall extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    addUpdateUsers() {
        i = 0;
        console.log("entra");
        for (i; i < this.props.tweets.length; i++) {
            tweet = this.props.tweets[i];
            //console.log(tweet);
            usName = tweet.author;
            j = 0;
            user = this.props.users.filter((user) => {
                return user.name === usName;
            });
            //console.log(user);
            if (user.length > 0) {
                Meteor.call("users.update", user, (err, tweet) => {
                    if (err) throw err;
                    //console.log("tweet: ", err);
                })
            }
            else {
                Meteor.call("users.insert", tweet, (err, tweet) => {
                    if (err) throw err;
                    //console.log("tweet: ", err);
                });
            }
        }
    }

    renderTweets() {
        return this.props.tweets.map((tweet) => {
            return (
                <Tweet key={tweet._id} tweet={tweet}/>
            )
        });
    }

    renderBarChart() {
        return <BarChart data={this.props.users}/>
    }

    render() {
        return (
            <div className="wall-background" style={{"backgroundColor": this.props.background}}>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 ">
                            <h1 style={{"color": this.props.title}}> Active Users </h1>
                            <canvas drawable ></canvas>
                            {this.renderBarChart()}
                        </div>
                        <div className="col-md-8 ">
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
    Meteor.subscribe('StreamUsers');
    Meteor.subscribe('MostRts', hashtag);
    return {
        tweets: Tweets.find({}, {sort: {date: -1}, limit: 30}).fetch(),

        users: StreamUsers.find({}).fetch(),
        rts: TweetsAgg.find({}).fetch(),

        background: background,
        title: title,
        body: body
    };
})(Wall);

class Tweet extends Component {
    render() {
        return (
            <div className="col-md-6">
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