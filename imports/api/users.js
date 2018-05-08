import {Mongo} from "meteor/mongo";
import {Meteor} from "meteor/meteor";
import {check} from "meteor/check";
import {SimpleSchema} from "simpl-schema/dist/SimpleSchema";

export const Users = new Mongo.Collection("Users");

if (Meteor.isServer) {
    Meteor.publish("Users", (user) => {
        return Users.find({name:user});
    });
}

Meteor.methods({
    /*"users.insert"(tweet) {
        console.log("inserting user");
        //userInstance = Users.find({name:tweet.author}).fetch();
        //console.log("ser", userInstance);
        //if(!userInstance) {
            const user = {
                query: tweet.query,
                name: tweet.screenname,
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
    /*"users.update"(tweet){
        console.log("find/update/insert user");
        res = Users.find({name:tweet.username}).fetch();
        console.log(res);
        if(res.length>0){
            const userUpdate = {
                query: tweet.query,
                name: tweet.screenname,
                conteo: res.conteo + 1
            };
            console.log("userUpdate");
            Users.update({name:res.name}, userUpdate);
        }
        else{
            const userInsert = {
                query: tweet.query,
                name: tweet.screenname,
                conteo: 1
            };
            console.log("userInsert");
            Users.insert(userInsert);
        }

    },*/
});
