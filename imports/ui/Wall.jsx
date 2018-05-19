import React, {Component} from "react";
import {withTracker} from 'meteor/react-meteor-data';

class Wall extends Component {
    constructor(props) {
        super(props);

    }


    renderTweets() {
        return this.props.tweets.map((tweet) => {
            return (
                <Tweet key={tweet._id} tweet={tweet}/>
            )
        });

    }



    render() {
        return (
            <div className="wall-background" style={{"backgroundColor": this.props.background}}>
                <div className="row">
                    {this.renderTweets()}
                </div>
            </div>
        );
    }
}

//export default Wall;
export default Wall;

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