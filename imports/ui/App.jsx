import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';
import CreateEvent from "./CreateEvent";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        Meteor.call("tweets.stream", "twitter", (err, stream) => {
            if (err) throw err;
            console.log(stream);
        });
    }

    render() {
        return (
            <CreateEvent/>
        );
    }
}

export default App;