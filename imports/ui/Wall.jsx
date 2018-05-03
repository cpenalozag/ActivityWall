import React, {Component} from "react";
import {Tweets} from "../api/tweets";
import {withTracker} from 'meteor/react-meteor-data';
import BubbleChart from "./BubbleChart.js";
import {Users} from "../api/users.js";


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
        console.log(this.props.tweets);
        this.addUpdateUsers.bind(this);
        return this.props.tweets.map((tweet) => {
            return (
                <Tweet key={tweet._id} tweet={tweet}/>
            )
        });
    }

    userList =
        [{
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000a6"
            },
            "query": "Davey",
            "name": "Audi",
            "conteo": 34
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000a7"
            },
            "query": "Martha",
            "name": "Micky",
            "conteo": 151
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000a8"
            },
            "query": "Derron",
            "name": "Northrup",
            "conteo": 269
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000a9"
            },
            "query": "Reggie",
            "name": "Rosanna",
            "conteo": 57
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000aa"
            },
            "query": "Upton",
            "name": "Ollie",
            "conteo": 300
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000ab"
            },
            "query": "Cordula",
            "name": "Kirbie",
            "conteo": 175
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000ac"
            },
            "query": "Cary",
            "name": "Romain",
            "conteo": 263
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000ad"
            },
            "query": "Galven",
            "name": "Hew",
            "conteo": 166
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000ae"
            },
            "query": "Hadleigh",
            "name": "Mag",
            "conteo": 91
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000af"
            },
            "query": "Hyacinthie",
            "name": "Christoper",
            "conteo": 144
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000b0"
            },
            "query": "Emmanuel",
            "name": "Christiana",
            "conteo": 213
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000b1"
            },
            "query": "Reagen",
            "name": "Boonie",
            "conteo": 74
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000b2"
            },
            "query": "Darius",
            "name": "Nels",
            "conteo": 284
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000b3"
            },
            "query": "Link",
            "name": "Mathilda",
            "conteo": 277
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000b4"
            },
            "query": "Horace",
            "name": "Eloisa",
            "conteo": 209
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000b5"
            },
            "query": "Graehme",
            "name": "Consolata",
            "conteo": 196
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000b6"
            },
            "query": "Allyson",
            "name": "Nadeen",
            "conteo": 60
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000b7"
            },
            "query": "Kissee",
            "name": "Ware",
            "conteo": 265
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000b8"
            },
            "query": "Joanna",
            "name": "Babette",
            "conteo": 224
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000b9"
            },
            "query": "Risa",
            "name": "Harlene",
            "conteo": 84
        }, {
            "id": {
                "$oid": "5aeaf4e0fc13ae6f650000ba"
            },
            "query": "Carlotta",
            "name": "Jazmin",
            "conteo": 137
        },
        ];


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
                <div className="container">
                    <h1 style={{"color": this.props.title}}> Active Users </h1>
                    <BubbleChart users={this.userList}/>
                </div>
                <div className="container">

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
    const hashtag = props.location.state.hashtag;
    const background = props.location.state.background;
    const title = props.location.state.title;
    const body = props.location.state.body;
    Meteor.subscribe('Tweets', hashtag);
    Meteor.subscribe('Users');
    return {
        tweets: Tweets.find({}).fetch(),

        users: Users.find({}).fetch(),

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