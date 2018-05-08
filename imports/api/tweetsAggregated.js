import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {SimpleSchema} from "simpl-schema/dist/SimpleSchema";
import {Tweets} from "./tweets";
import {Users} from "./users.js";

export const TweetsAgg = new Mongo.Collection("TweetsAgg");


if (Meteor.isServer) {
    Meteor.publish("MostRts", (hashtag) => {
        return TweetsAgg.find({query: hashtag}, {sort: {rts: -1}, limit: 10});
    });
    Meteor.publish("MostFavs", (hashtag) => {
        return TweetsAgg.find({query: hashtag}, {sort: {favs: -1}, limit: 10});
    });
    Meteor.publish("byUser", (hashtag,screenname) => {
        return TweetsAgg.find({query: hashtag, screenname:screenname});
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
         * Searches tweets filtered by keyword
         **/
        client.get('search/tweets', {q: `#${hashtag}`, result_type: "mixed", count: 100, include_entities:true}, Meteor.bindEnvironment(function(error, list, response) {
            TweetsAgg.remove({});
            const tweets  = Object.values(list["statuses"]);
            tweets.forEach (Meteor.bindEnvironment(function(t) {
                const tweet = {
                    query: hashtag,
                    twid: t["id"],
                    rts: t["retweet_count"],
                    favs: t["favorite_count"],
                    screenname: t["user"]["screen_name"]
                };
                new SimpleSchema({
                    query: {type: String},
                    twid: {type: Number},
                    rts: {type: Number},
                    favs: {type: Number},
                    screenname: {type: String},
                }).validate(tweet);
                TweetsAgg.insert(tweet);
                /*Insert user*/
                //console.log("find/update/insert user");
                res = Users.find({name:tweet.username}).fetch();
                console.log(res);
                if(res.length>0){
                    var cont = res.conteo;
                    //console.log("cont", cont);
                    const userUpdate = {
                        query: tweet.query,
                        name: tweet.screenname,
                        conteo: res.conteo + 1
                    };
                    //console.log("userUpdate");
                    Users.update({name:res.name}, userUpdate);
                }
                else{
                    const userInsert = {
                        query: tweet.query,
                        name: tweet.screenname,
                        conteo: 1
                    };
                    //console.log("userInsert");
                    Users.insert(userInsert);
                }
            }));
        }));
    }
})
