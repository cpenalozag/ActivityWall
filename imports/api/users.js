import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {SimpleSchema} from "simpl-schema/dist/SimpleSchema";

export const Users = new Mongo.Collection("Users");

let stream = null;

if (Meteor.isServer) {
    Meteor.publish("Users", (hashtag) => {
        console.log("query", hashtag);
        return Users.find({query: hashtag});
    });
}

Meteor.methods({
    "user.insert"(user) {
        console.log("inserting user")
        check(user, String);
        Users.insert({
            name: user,
            conteo: 0
        })
    },
    "user.update"(user) {
        console.log("inserting user")
        check(user, String);
        userAct = user.find({name: user});
        if (userAct) {
            console.log(userAct);
            Users.update(
                {name: user},
                {
                    name: user,
                    conteo: user.conteo + 1
                },
                {upsert: true}
            )
        }
        else{
            console.log(userAct);
            Users.update(
                {name: user},
                {
                    name: user,
                    conteo: 1
                },
                {upsert: true}
            )
        }
    }
})
