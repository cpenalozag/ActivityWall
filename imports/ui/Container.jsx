import React, {Component} from "react";
import {Tweets} from "../api/tweets";
import {withTracker} from 'meteor/react-meteor-data';
import {StreamUsers} from "../api/streamUsers.js";
import {TweetsAgg} from "../api/tweetsAggregated.js";
import {BrowserRouter as Router, Switch, Route, NavLink} from 'react-router-dom';
import Wall from "./Wall";
import Diagrams from "./Diagrams";
import Photos from "./Photos";


class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false,
            pictures: "",
            instagram:false
        };
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    callInstagram() {
        Meteor.setInterval(() => {
            Meteor.call('instagram.get', this.props.hashtag, (error, result) => {
                if (error) {
                    // handle the error
                } else {
                    this.setState({pictures: result});
                }
            });
        }, 15000)
    }

    componentWillMount() {
        this.callInstagram();
    }


    render() {
        return (
            <Router>
                <main>
                    <nav className="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
                        <div className="container">
                            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                                <a className="navbar-brand" style={{textTransform: "uppercase"}} href="/">EVENT LOGO</a>
                                <ul className="navbar-nav ml-auto">

                                    <li className="nav-item">
                                        <NavLink activeClassName="active-link" exact className="nav-link" to="/">Home</NavLink>
                                    </li>
                                    <li className="nav-item">
                                        <NavLink activeClassName="active-link" exact className="nav-link" to="/">About Us</NavLink>
                                    </li>

                                </ul>
                                <a className="navbar-brand" style={{textTransform: "uppercase"}} href="/">#{this.props.hashtag}</a>
                            </div>
                        </div>
                    </nav>
                    <div className={this.state.expanded ? "sidebar sidebar--expanded" : "sidebar"}>
                        {this.state.expanded ?
                            <div>

                                <a className="pull-right arrow-close" onClick={this.toggleSidebar}>
                                    <i className="fa fa-arrow-circle-left"></i>
                                </a>
                            </div>
                             :
                            <a className="pull-right arrow-open" onClick={this.toggleSidebar}>
                                <i className="fa fa-arrow-circle-right"></i>
                            </a>}


                        <div className="container sidebar-container">
                            <div className="row">
                                <div className="col-md-12">
                                    <ul className="list-group">
                                        <li>
                                            <NavLink activeClassName="active-link" to={`/${this.props.hashtag}/tweets`}>Tweets</NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active-link" to={`/${this.props.hashtag}/diagrams`}>Diagrams</NavLink>
                                        </li>
                                        <li>
                                            <NavLink activeClassName="active-link" to={`/${this.props.hashtag}/instagram`}>Photos</NavLink>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>

                    <section className={this.state.expanded ? "main-content main-content--expanded" : "main-content"}>
                        <Switch>
                            <Route exact path="/:hashtag/tweets"
                                   render={(props) => <Wall {...props} tweets={this.props.tweets}
                                                            users={this.props.users}
                                                            rts={this.props.rts}/>}/>
                            <Route exact path="/:hashtag/diagrams"
                                   render={(props) => <Diagrams {...props} tweets={this.props.tweets}
                                                            users={this.props.users}
                                                            rts={this.props.rts}/>}/>
                            <Route exact path="/:hashtag/instagram"
                                   render={(props) => <Photos {...props} pictures={this.state.pictures}/>}/>
                        </Switch>
                    </section>
                </main>
            </Router>
        );
    }
}

//export default Wall;
export default withTracker((props) => {
    Meteor.subscribe('Tweets', props.match.params.hashtag);
    Meteor.subscribe('StreamUser', props.match.params.hashtag);
    Meteor.subscribe('MostRts', props.match.params.hashtag);
    return {
        tweets: Tweets.find({}, {sort: {date: -1}, limit: 30}).fetch(),
        users: StreamUsers.find({}, {sort: {count: -1}, limit: 5}).fetch(),
        rts: TweetsAgg.find({}).fetch(),
        background: props.colorBackground,
        body: props.colorBody,
        title: props.colorTitle,
        hashtag: props.match.params.hashtag
    };
})(Container);