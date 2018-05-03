import React, {Component} from "react";
import {Tweets} from "../api/tweets";
import {withTracker} from 'meteor/react-meteor-data';
import BubbleChart from "./BubbleChart.js";


class Wall extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderTweets() {
        console.log(this.props.tweets);
        return this.props.tweets.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet}/>
        ));
    }

    render() {
        return (
            <div>
                <BubbleChart/>

                <div className="container">
                    <h1>Tweets</h1>
                    <div className="row">
                        {this.renderTweets()}
                    </div>
                </div>
            </div>
        );
    }
}

//export default Wall;
export default withTracker((props) => {
    const hashtag = props.location.state.referrer;
    Meteor.subscribe('Tweets', hashtag);
    return {
        tweets: Tweets.find({}).fetch()
    };
})(Wall);

class Tweet extends Component {
    render() {
        return (
            <div className="col-md-6">
                <div className="tweet">
                    <a href="#" className="follow"><i className="fa fa-twitter"></i>Follow</a>

                    <div className="tweet--user">
                        <img className="tweet--user-avatar" src={this.props.tweet.avatar} alt={`${this.props.screenname} profile picture` }/>
                        <div
                            className="tweet--user-name">{this.props.tweet.author}<span>@{this.props.tweet.screenname}</span>
                        </div>
                    </div>
                    <p className="tweet--body">{this.props.tweet.body}</p>
                    <div className="tweet--time">{this.props.tweet.date}</div>
                </div>
            </div>
        );
    }
}