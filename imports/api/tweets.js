import { Mongo } from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {SimpleSchema} from "simpl-schema";

export const Tweets = new Mongo.Collection("Tweets");

if(Meteor.isServer){
    Meteor.publish("Tweets", (id) => {
        return Tweets.find({eventId:id}, {sort: {createdAt: 1}});
    });
}

Meteor.methods({
    "tweets.stream"(hashtag){
        check(hashtag, String);
        var Twitter = require("twitter");
        var client = new Twitter({
            consumer_key: process.env.TWITTER_CONSUMER_KEY,
            consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
            access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
            access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
        });
        /**
         * Stream statuses filtered by keyword
         * number of tweets per second depends on topic popularity
         **/
        var stream = client.stream("statuses/filter", {track: `#${hashtag}`}, function(stream) {
            stream.on("data", function(data) {
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
                    twid: {type: String},
                    author: {type: String},
                    avatar: {type: String},
                    body: {type: String},
                    date: {type: Date},
                    screenname: {type: String},
                }).validate(tweet);

                Tweets.insert(tweet);

            });

            stream.on("error", function(error) {
                throw error;
            });
        });
        return stream;
    }
})