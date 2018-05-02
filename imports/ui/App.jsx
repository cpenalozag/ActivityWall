import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';
import { Switch, Route } from 'react-router-dom'

import CreateEvent from "./CreateEvent";
import Wall from "./Wall";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Switch>
                <Route exact path='/' component={CreateEvent}/>
                <Route path='/wall' component={Wall}/>
            </Switch>
        );
    }
}

export default App;