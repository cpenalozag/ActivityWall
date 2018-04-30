import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        Meteor.call("tweets.stream","twitter", (err,res)=>{
            if (err) throw err;
            console.log(res);
        });
    }

    render() {
        return (
            <div>App</div>
        );
    }
}

export default App;