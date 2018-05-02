import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {SimpleSchema} from "simpl-schema/dist/SimpleSchema";

export const Tweets = new Mongo.Collection("Tweets");


let stream =null;

if (Meteor.isServer) {
    Meteor.publish("Tweets", (hashtag) => {
        console.log("query", hashtag);
        return Tweets.find({query: hashtag});
    });
}

Meteor.methods({
    "tweets.stream"(hashtag) {
        console.log("inserting tweets")
        check(hashtag, String);
        var Twitter = require("twitter");
        var client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });
        if(stream){
            console.log("Stopping previous stream");
            stream.destroy();
            // Remove all the tweets
            Tweets.remove({});
        }
        /**
         * Stream statuses filtered by keyword
         * number of tweets per second depends on topic popularity
         **/
        console.log("reinserting");
        client.stream("statuses/filter", {track: `#@hashtag`},  (stream)=> {
            stream.on("data", Meteor.bindEnvironment(function (data) {
                // Construct a new tweet object
                const tweet = {
                    query: hashtag,
                    twid: data["id"],
                    author: data["user"]["name"],
                    avatar: data["user"]["profile_image_url"],
                    body: data["text"],
                    date: data["created_at"],
                    screenname: data["user"]["screen_name"]
                };

                new SimpleSchema({
                    query: {type: String},
                    twid: {type: Number},
                    author: {type: String},
                    avatar: {type: String},
                    body: {type: String},
                    date: {type: String},
                    screenname: {type: String},
                }).validate(tweet);
                console.log(tweet);
                Tweets.insert(tweet);

            }));

            stream.on("error", Meteor.bindEnvironment(function (error) {
                console.log("Error " + error);
                //throw Meteor.Error(error);
            }));
        });

    }
})
