import {Meteor} from "meteor/meteor";
import {HTTP} from "meteor/http";

Meteor.methods({
    "instagram.get"(hashtag) {
        // Camilo Zambrano: You are not checking the hastag here or on App.js, this has potential security problems for your app
        try {
            const res = HTTP.get(`https://www.instagram.com/explore/tags/${hashtag}/?__a=1`);
            return res.data.graphql.hashtag.edge_hashtag_to_media.edges;
        } catch (error) {
            return "";
        }
    },
});
