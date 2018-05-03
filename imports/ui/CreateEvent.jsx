import React, {Component} from "react";
import {Redirect} from "react-router-dom";

import ColorPicker from "./ColorPicker";

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            colorBackground: "#040408",
            colorTitle: "#00aced",
            colorBody: "#E9F2F2",
            redirect: false,
            hashtag: "",
            socialNetwork: "T"
        };
        this.handleOnClick = this.handleOnClick.bind(this);
        this.handleSNChange = this.handleSNChange.bind(this);
    }

    handleOnClick() {
        // Get user input
        const hashtag = this.refs.hashtag.value;
        Meteor.call("tweets.stream", hashtag);
        // then redirect
        this.setState({hashtag: hashtag, redirect: true});
    }

    handleSNChange(e) {
        const val = e.target.value;
        this.setState({
            socialNetwork: val
        })
    }

    next() {
        this.setState({currentTab: this.state.currentTab + 1});
        //setTimeout(this.setState({arrowEnabled: true}), 500);
    }

    prev() {
        this.setState({currentTab: this.state.currentTab - 1});
    }

    handleChangeCompleteBackground = (color) => {
        this.setState({colorBackground: color.hex});
    };

    handleChangeCompleteTitle = (color) => {
        this.setState({colorTitle: color.hex});
    };

    handleChangeCompleteBody = (color) => {
        this.setState({colorBody: color.hex});
    };

    render() {
        if (this.state.redirect) {
            return <Redirect to={{
                pathname: "/wall",
                state: {
                    hashtag: this.state.hashtag,
                    background: this.state.colorBackground,
                    title: this.state.colorTitle,
                    body: this.state.colorBody
                }
            }}/>;
        }
        return (

            <div className="create-event container-fluid">
                <div className="overlay">
                    <div id="carouselExampleIndicators" className="carousel slide" data-interval="false">
                        <ol className="carousel-indicators">
                            <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                            <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                        </ol>
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container">
                                    <h1 className="title-home light-blue"><strong>Activity Wall</strong></h1>
                                    <p className="p-home">
                                        Follow what people are saying about your event in social media!
                                    </p>
                                    <div className="row side-pad">
                                        <div className="col-md-3 col-xs-6">
                                            <div className="info">
                                                <div className="icon">
                                                    <i className="fa fa-edit"/>
                                                </div>
                                                <div>
                                                    <p className="home-list"><strong
                                                        className="light-blue">1.</strong> Customize your wall
                                                    </p>
                                                    <p className="description">Pick your colors, logo and background
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-xs-6">
                                            <div className="info">
                                                <div className="icon">
                                                    <i className="fa fa-users"/>
                                                </div>
                                                <div>
                                                    <p className="home-list"><strong
                                                        className="light-blue">2.</strong> Pick the social networks
                                                    </p>
                                                    <p className="description">Choose if you want to follow what people
                                                        are saying in Twitter, Instagram or both!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-xs-6">
                                            <div className="info">
                                                <div className="icon">
                                                    <i className="fa fa-search"/>
                                                </div>
                                                <div>
                                                    <p className="home-list"><strong
                                                        className="light-blue">3.</strong> Define your search
                                                    </p>
                                                    <p className="description">Tell us which hashtag to look for and the
                                                        type of visualization you prefer
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-md-3 col-xs-6">
                                            <div className="info">
                                                <div className="icon">
                                                    <i className="fa fa-bar-chart"/>
                                                </div>
                                                <div>
                                                    <p className="home-list"><strong
                                                        className="light-blue">4.</strong> Start using your wall
                                                    </p>
                                                    <p className="description">See your users' interactions and analyse
                                                        them through diagrams and statistics!
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <h1 className="title-home">Choose your colors</h1>
                                <div className="color-pickers">
                                    <div className="row row-pickers">
                                        <div className="col-md-4">
                                            <p className="p-home">Background</p>
                                            <ColorPicker color={this.state.colorBackground}
                                                         onChangeComplete={this.handleChangeCompleteBackground.bind(this)}/>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="p-home">Body</p>
                                            <ColorPicker color={this.state.colorBody}
                                                         onChangeComplete={this.handleChangeCompleteBody.bind(this)}/>
                                        </div>
                                        <div className="col-md-4">
                                            <p className="p-home">Titles</p>
                                            <ColorPicker color={this.state.colorTitle}
                                                         onChangeComplete={this.handleChangeCompleteTitle.bind(this)}/>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <h1 className="title-home">Choose social networks</h1>
                                <div className="container image-height">
                                    <div className="row side-pad icon-row">
                                        <div className="col-md-4">
                                            <input onChange={this.handleSNChange}
                                                   value="T" type="radio" name="sn"
                                                   id="twitter" className="input-hidden"/>
                                            <label htmlFor="twitter">
                                                <img
                                                    className="img-responsive img-medium"
                                                    src="images/twitter.png"
                                                    alt="Twitter logo"/>
                                            </label>
                                        </div>
                                        <div className="col-md-4">
                                            <input onChange={this.handleSNChange}
                                                   value="TI" type="radio" name="sn"
                                                   id="ti" className="input-hidden"/>
                                            <label htmlFor="ti">
                                                <img
                                                    className="img-responsive img-medium"
                                                    src="images/ti.png"
                                                    alt="Twitter and instagram logos"/>
                                            </label>
                                        </div>
                                        <div className="col-md-4">
                                            <input onChange={this.handleSNChange}
                                                   value="I" type="radio" name="sn"
                                                   id="instagram" className="input-hidden"/>
                                            <label htmlFor="instagram">
                                                <img
                                                    className="img-responsive img-medium"
                                                    src="images/instagram.png"
                                                    alt="Instagram logo"/>
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="carousel-item">
                                <h1 className="title-home">Define your search</h1>
                                <div>
                                    <div className="container">
                                        <div className="row side-pad">
                                            <div className="row-pickers">
                                                <form className="form-inline" onSubmit={this.handleOnClick}>
                                                    <label className="hashtag" htmlFor="inlineFormInputName2"># </label>
                                                    <input type="text" className="form-control mb-2 mr-sm-2"
                                                           id="inlineFormInputName2" placeholder="BadBunnyBeibe"
                                                           ref="hashtag"/>
                                                    <button type="submit" className="btn btn-primary mb-2">Search <i
                                                        className="fa fa-search"/></button>
                                                </form>
                                            </div>
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                        {this.state.currentTab !== 0 ?
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button"
                               onClick={this.prev.bind(this)}
                               data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a> :
                            ""}
                        {this.state.currentTab !== 3 ?
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button"
                               onClick={this.next.bind(this)}
                               data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a> :
                            ""}
                    </div>
                </div>
            </div>
        )
            ;
    }
}

export default CreateEvent;