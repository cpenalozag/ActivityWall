import React, {Component} from "react";
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';

import CreateEvent from "./CreateEvent";
import Wall from "./Wall";

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hashtag: "",
        };
    }

    handleSubmit() {
        console.log(hashtag);
    }

    render() {
        return (
            <Router>
                <div>
                    <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                        <div className="container">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <a className="navbar-brand" style={{textTransform: "uppercase"}} href="/">EVENT LOGO</a>
                                <ul className="navbar-nav ml-auto">
                                    <li className="nav-item">
                                        <NavLink exact className="nav-link" to="/">About Us</NavLink>
                                    </li>

                                </ul>
                                {this.state.hashtag.length > 0 ?
                                    <a className="navbar-brand" style={{textTransform: "uppercase"}}
                                       href="/">#{this.props.hashtag}</a>
                                    : ""}

                            </div>
                        </div>
                    </nav>
                    <Switch>
                        <Route exact path='/' render={(props) => <CreateEvent {...props} hashtag={this.state.hashtag}
                                                                      handleSubmit={this.handleSubmit().bind(this)}/>}/>
                        <Route exact path='/wall' render={(props) => <Wall {...props} hashtag={this.state.hashtag}/>}/>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default Navbar;