// Camilo Zambrano: you should organize all the .js files on different folders  

import React, {Component} from "react";
import {Switch, Route} from 'react-router-dom'

import CreateEvent from "./CreateEvent";
import Container from "./Container";
import Diagrams from "./Diagrams";
import Photos from "./Photos";


class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            colorBackground: "#040408",
            colorTitle: "#00aced",
            colorBody: "#E9F2F2",
            hashtag: "",
            redirect:false
        };
    }

    handleOnClick(hashtag) {
        // Get user input

        // Camilo Zambrano: For extra security you should also validate the user input before using the backend
        Meteor.call("tweets.stream", hashtag);
        Meteor.call("tweets.get", hashtag);
        this.setState({hashtag:hashtag, redirect:true})
    }

    render() {
        return (
            <div>
                <Switch>
                    <Route exact path='/' render={(props) =>
                        <CreateEvent {...props} colorBackground={this.state.colorBackground} colorTitle={this.state.colorTitle}
                              colorBody={this.state.colorBody} hashtag={this.state.hashtag} redirect={this.state.redirect} handleOnClick={this.handleOnClick.bind(this)} />}/>
                    <Route exact path='/:hashtag/tweets' render={(props) =>
                        <Container {...props} colorBackground={this.state.colorBackground} colorTitle={this.state.colorTitle}
                              colorBody={this.state.colorBody} hashtag={this.state.hashtag} />}/>
                    <Route exact path="/:hashtag/diagrams"
                           render={(props) => <Diagrams {...props} tweets={this.props.tweets}
                                                        users={this.props.users}
                                                        rts={this.props.rts}/>}/>
                </Switch>
            </div>
        );
    }
}

// Camilo Zambrano: A great idea is to always use proptypes to make sure your component gets the proptypes you need.

export default App; /* Camilo Zambrano: also, you are using routing and that's good. But you should also use a withtracker element from 
react meteor data*/
