import React, {Component} from "react";
import { Tweets } from "../api/tweets";
import {withTracker} from 'meteor/react-meteor-data';
import BubbleChart from "./BubbleChart.js";


class Wall extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        //var hash = this.props.location.state.referrer;
        //Meteor.call("tweets.stream", hash);
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
                <h1>Tweets</h1>
                {this.renderTweets()}

            </div>
        );
    }
}
//export default Wall;
export default withTracker((props) => {
    console.log("suscribe");
    const hashtag =props.location.state.referrer;
    console.log(hashtag);
    Meteor.subscribe('Tweets',hashtag);
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