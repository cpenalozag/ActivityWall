import React, {Component} from "react";
import {NavLink} from "react-router-dom";
import {BrowserRouter as Router, Route} from "react-router-dom";

class Nav extends Component {


    render() {
        return (
            <Router>
                <div>
                    <div>
                        <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
                            <div className="container">
                                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                    <a className="navbar-brand" style={{textTransform: "uppercase"}} href="/">EVENT LOGO</a>
                                    <ul className="navbar-nav ml-auto">

                                        <li className="nav-item">
                                            <NavLink exact className="nav-link" to="/">Home</NavLink>
                                        </li>
                                        <li className="nav-item">
                                            <NavLink exact className="nav-link" to="/">About Us</NavLink>
                                        </li>

                                    </ul>
                                    <a className="navbar-brand" style={{textTransform: "uppercase"}} href="/">#{this.props.hashtag}</a>
                                </div>
                            </div>
                        </nav>
                    </div>
                </div>
            </Router>

        );
    }
}

export default Nav;