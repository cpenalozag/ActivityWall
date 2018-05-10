import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom'

import CreateEvent from "./CreateEvent";
import Wall from "./Wall";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' component={CreateEvent}/>
                    <Route exact path='/wall' component={Wall}/>
                </Switch>
            </div>
        );
    }
}

export default App;