import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {SimpleSchema} from "simpl-schema/dist/SimpleSchema";

export const Users = new Mongo.Collection("Users");

if (Meteor.isServer) {
    Meteor.publish("Users", () => {
        return Users.find({});
    });
}

Meteor.methods({
    "users.insert"(tweet) {
        console.log("inserting user");
        //userInstance = Users.find({name:tweet.author}).fetch();
        //console.log("ser", userInstance);
        //if(!userInstance) {
            const user = {
                query: tweet.query,
                name: tweet.author,
                conteo: 0
            };
            new SimpleSchema({
                query: {type: String},
                name: {type: String},
                conteo: {type: Number}
            }).validate(user);
            console.log("insert");
            Users.insert(user);
        //}
    },
    "users.update"(user){
        check(user[0].name, String);
        console.log("update user");
        const userUpdate = {
            query: user[0].query,
            name: user[0].name,
            conteo: user[0].conteo + 1
        };
        console.log(userUpdate);
        Users.update({name:user[0].name}, userUpdate);

    }
});
