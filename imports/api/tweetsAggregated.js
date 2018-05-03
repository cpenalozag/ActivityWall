import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {SimpleSchema} from "simpl-schema/dist/SimpleSchema";
import {Tweets} from "./tweets";

export const TweetsAgg = new Mongo.Collection("TweetsAgg");


if (Meteor.isServer) {
    Meteor.publish("MostRts", (hashtag) => {
        return TweetsAgg.find({query: hashtag}, {sort: {rts: -1}, limit: 10});
    });
    Meteor.publish("MostFavs", (hashtag) => {
        return TweetsAgg.find({query: hashtag}, {sort: {favs: -1}, limit: 10});
    });
}

Meteor.methods({
    "tweets.get"(hashtag) {
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
        client.get('search/tweets', {q: `#${hashtag}`, result_type: "popular", count: 30, include_entities:true}, function(error, list, response) {
            const tweets = Array.from(Object.values(list));
            tweets.forEach(function(t) {
                console.log(t);
                const tweet = {
                    query: hashtag,
                    twid: {type: Number},
                    rts: t["retweet_count"],
                    favs: t["favorite_count"],
                    screenname: data["user"]["screen_name"]
                }
                new SimpleSchema({
                    query: {type: String},
                    twid: {type: Number},
                    rts: {type: Number},
                    favs: {type: Number},
                    screenname: {type: String},
                }).validate(tweet);
                Tweets.insert(tweet);
            });
        });
    }
})
