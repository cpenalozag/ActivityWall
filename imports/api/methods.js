import {Meteor} from 'meteor/meteor';
import {check} from "meteor/check";

Meteor.methods({
    "tweets.stream"(hashtag){
        check(hashtag, String);
        var Twitter = require('twitter');
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
        var stream = client.stream('statuses/filter', {track: `#${hashtag}`});
        stream.on('data', function(event) {
            console.log(event && event.text);
        });

        stream.on('error', function(error) {
            throw error;
        });
        return stream;
    }
})
