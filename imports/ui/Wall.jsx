import React, {Component} from "react";
import {Tweets} from "../api/tweets";
import {withTracker} from 'meteor/react-meteor-data';
import BubbleChart from "./BubbleChart.js";
import {Users} from "../api/users.js";
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
            console.log(user);
            if (user.length > 0) {
                Meteor.call("users.update", user, (err, tweet) => {
                    if (err) throw err;
                    console.log("tweet: ", err);
                })
            }
            else {
                Meteor.call("users.insert", tweet, (err, tweet) => {
                    if (err) throw err;
                    console.log("tweet: ", err);
                });
            }
        }
    }

    renderTweets() {
        console.log(this.props.rts);
        //this.addUpdateUsers.bind(this);
        return this.props.tweets.map((tweet) => {
            return (
                <Tweet key={tweet._id} tweet={tweet}/>
            )
        });
    }

    /*componentWillUpdate(newProps) {
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
            console.log(user);
            if (user.length>0) {
                Meteor.call("users.update", user, (err, tweet) => {
                    if (err) throw err;
                    console.log("tweet: ", err);
                })
            }
            else {
                Meteor.call("users.insert", tweet, (err, tweet) => {
                    if (err) throw err;
                    console.log("tweet: ", err);
                });
            }
        }
    }*/

    //<h1 style={{"color": this.props.title}}>{this.props.location.state.hashtag}</h1>

    render() {
        return (
            <div style={{"background-color": this.props.background}}>
                <div className="row">
                    <div className="col-md-2 ">
                        <h1 style={{"color": this.props.title}}> Active Users </h1>
                        <BarChart/>
                    </div>
                    <div className="col-md-10 ">
                        <div className="row">

                            {this.renderTweets()}

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
    Meteor.subscribe('Users');
    Meteor.subscribe('MostRts', hashtag);
    return {
        tweets: Tweets.find({}).fetch(),

        users: Users.find({}).fetch(),
        rts: TweetsAgg.find({}).fetch(),

        background: background,
        title: title,
        body: body
    };
})(Wall);

class Tweet extends Component {
    render() {
        return (
            <div className="col-md-4">
                <div className="tweet">
                    <a href="#" className="follow"><i className="fa fa-twitter"></i>Follow</a>

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