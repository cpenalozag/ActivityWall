import React, {Component} from "react";
import {Tweets} from "../api/tweets";
import {withTracker} from 'meteor/react-meteor-data';
import {StreamUsers} from "../api/streamUsers.js";
import {TweetsAgg} from "../api/tweetsAggregated.js";
import {BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom';
import Nav from "./Nav";
import Wall from "./Wall";
import Diagrams from "./Diagrams";


class Container extends Component {
    constructor(props) {
        super(props);
        this.state = {
            expanded: false
        };
        this.toggleSidebar = this.toggleSidebar.bind(this);
    }

    toggleSidebar() {
        this.setState({
            expanded: !this.state.expanded
        })
    }

    render() {
        return (
            <Router>
                <main>
                    <Nav hashtag={this.props.hashtag} title={this.props.title}/>
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
                                <div className="col-md-10">
                                    <Link to={`/wall/${this.props.hashtag}/diagrams`}>Diagrams</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className={this.state.expanded ? "main-content main-content--expanded" : "main-content"}>
                        <Switch>
                            <Route exact path="/wall/:hashtag"
                                   render={(props) => <Wall {...props} tweets={this.props.tweets}
                                                            users={this.props.users}
                                                            rts={this.props.rts}/>}/>
                            <Route exact path="/wall/:hashtag/diagrams"
                                   render={(props) => <Diagrams {...props} tweets={this.props.tweets}
                                                            users={this.props.users}
                                                            rts={this.props.rts}/>}/>
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