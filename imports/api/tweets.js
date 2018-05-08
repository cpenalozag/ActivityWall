import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {SimpleSchema} from "simpl-schema/dist/SimpleSchema";

export const Tweets = new Mongo.Collection("Tweets");


if (Meteor.isServer) {
    Meteor.publish("Tweets", (hashtag) => {
        return Tweets.find({query: hashtag}, {sort: {date: -1}, limit: 30});
    });
}

Meteor.methods({
    "tweets.stream"(hashtag) {
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
        stream = client.stream("statuses/filter", {track: '#' + hashtag}, (stream) => {
            stream.on("data", Meteor.bindEnvironment(function (data) {
                // Construct a new tweet object
                const date = moment(data["created_at"], 'dd MMM DD HH:mm:ss ZZ YYYY', 'en').format('MMMM Do YYYY, h:mm:ss a');
                const tweet = {
                    query: hashtag,
                    twid: data["id"],
                    author: data["user"]["name"],
                    avatar: data["user"]["profile_image_url"],
                    body: data["text"],
                    date: date,
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
                Tweets.insert(tweet);
                setTimeout(() => stream.destroy(), 10000);
            }));
            stream.on("error", Meteor.bindEnvironment(function (error) {

            }));

        });
    }
});
