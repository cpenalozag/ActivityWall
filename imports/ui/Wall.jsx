import React, {Component} from "react";


class Wall extends Component {
    constructor(props) {
        super(props);
        console.log(this.props);
        this.state = {};
    }

    componentDidMount() {
        //Meteor.call("tweets.stream", "twitter", (err, stream) => {
        //    if (err) throw err;
        //    console.log(stream);
        //});
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
            </div>
        );
    }
}
export default Wall;
//export default withTracker((props) => {
//    Meteor.subscribe('Tweets', "twitter");
//    return {
//        tweets: Tweets.find({}).fetch()
//    };
//})(Wall);

class Tweet extends Component {
    render() {
        return (
            <div className="">
                <p>{tweet.author}</p>
                <p>{tweet.body}</p>
                <p>{tweet.date}</p>
            </div>
        );
    }
}