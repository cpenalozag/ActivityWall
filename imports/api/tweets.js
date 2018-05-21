import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {SimpleSchema} from "simpl-schema/dist/SimpleSchema";
import {StreamUsers} from "./streamUsers";


export const Tweets = new Mongo.Collection("Tweets");



if (Meteor.isServer) {
    Meteor.publish("Tweets", (hashtag) => {
        return Tweets.find({query: hashtag}, {sort: {date: -1}, limit: 30});
    });
}
/* Camilo Zambrano: For security reasons, and also make your app not depend on https, you
should make this methods inside the "if (Meteor.isServer)..." */
Meteor.methods({
    "tweets.stream"(hashtag) {
        StreamUsers.remove({});
        Tweets.remove({});
        // Camilo Zambrano: You should also trim and check the tweet for spaces or some weird special characters
        check(hashtag, String);
        var Twitter = require("twitter");
        /* Camilo Zambrano: To speed things up, you should make the twitter client outside the methods and call it
        everytime you use it. Not spend time creating the client over and over again*/
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
                res = StreamUsers.find({name:tweet.author}).fetch();

                if(res.length>0){
                    let user = res[0];
                    StreamUsers.update(user._id, {
                        $set: { count:user.count+1},});
                }
                else{
                    const userInsert = {
                        query: tweet.query,
                        name: tweet.author,
                        profileURL: "https://twitter.com/"+tweet.screenname,
                        count: 1,
                    };
                    StreamUsers.insert(userInsert);
                }

                setTimeout(() => stream.destroy(), 15000000);
            }));
            stream.on("error", Meteor.bindEnvironment(function (error) {

            }));

        });
    }
});
