import React, {Component} from "react";
import { Tweets } from "../api/tweets";
import {withTracker} from 'meteor/react-meteor-data';


class Wall extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {};
    }

    componentDidMount() {
        var hash = this.props.location.state.referrer;
        Meteor.call("tweets.stream", hash, (err, stream) => {
            if (err) throw err;
            //console.log("tweet: ", stream);
        });
    }

    renderTweets() {
        return this.props.tweets.map((tweet) => (
            <Tweet key={tweet._id} tweet={tweet}/>
        ));
    }

    render() {
        return (
            <div>
                <h1>Tweets</h1>
                {this.renderTweets()}
            </div>
        );
    }
}
//export default Wall;
export default withTracker(() => {
    console.log(this.props);
    Meteor.subscribe('Tweets');
    return {
        tweets: Tweets.find({}).fetch()
    };
})(Wall);

class Tweet extends Component {
    render() {
        return (
            <div className="">
                <p>{this.props.tweet.author}</p>
                <p>{this.props.tweet.body}</p>
                <p>{this.props.tweet.date}</p>
            </div>
        );
    }
}