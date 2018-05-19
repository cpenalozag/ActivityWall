import {Meteor} from "meteor/meteor";
import {HTTP} from "meteor/http";

Meteor.methods({
    "instagram.get"(hashtag) {
        try {
            const res = HTTP.get(`https://www.instagram.com/explore/tags/${hashtag}/?__a=1`);
            return res.data.graphql.hashtag.edge_hashtag_to_media.edges;
        } catch (error) {
            return "";
        }
    },
});
