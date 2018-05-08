import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";

export const StreamUsers = new Mongo.Collection("StreamUsers");

if (Meteor.isServer) {
    Meteor.publish("StreamUsers", () => {
        return StreamUsers.find({});
    });
}
