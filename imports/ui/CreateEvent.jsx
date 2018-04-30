import React, {Component} from "react";
import ColorPicker from "./ColorPicker";

class CreateEvent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentTab: 0,
            colorBackground: "#ffffff",
            colorTitle: "#ffffff",
            colorBody: "#ffffff",
        };
    }

    next() {
        this.setState({currentTab: this.state.currentTab + 1});
    }

    prev() {
        this.setState({currentTab: this.state.currentTab - 1});
    }

    handleChangeCompleteBackground = (color) => {
        this.setState({ colorBackground: color.hex });
        console.log(this.state);
    };

    handleChangeCompleteTitle = (color) => {
        this.setState({ colorTitle: color.hex });
        console.log(this.state);
    };

    handleChangeCompleteBody = (color) => {
        this.setState({ colorBody: color.hex });
        console.log(this.state);
    };

    render() {
        return (
            <div className="container-fluid create-event">
                <div id="carouselExampleIndicators" className="carousel slide" data-interval="false">
                    <ol className="carousel-indicators">
                        <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                        <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    </ol>
                    <div className="carousel-inner">
                        <div className="carousel-item active">
                            <h1 className="title-home">Duro contra el muro</h1>
                            <p className="p-home">
                                Intro
                            </p>
                        </div>
                        <div className="carousel-item">
                            <h1 className="title-home">Choose your colors</h1>
                            <div className="color-pickers">
                                <div className="row">
                                    <div className="col-md-4"><ColorPicker color={ this.state.colorBackground }
                                                                           onChangeComplete={ this.handleChangeCompleteBackground.bind(this) }/></div>
                                    <div className="col-md-4"><ColorPicker color={ this.state.colorBody }
                                                                                onChangeComplete={ this.handleChangeCompleteTitle.bind(this) }/></div>
                                    <div className="col-md-4"><ColorPicker color={ this.state.colorTitle }
                                                                           onChangeComplete={ this.handleChangeCompleteBody.bind(this) }/></div>
                                </div>
                            </div>
                        </div>
                        <div className="carousel-item">
                            <h1 className="title-home">Choose social networks to follow</h1>
                        </div>
                        <div className="carousel-item text-center">
                            <h1 className="title-home">Write your hashtag</h1>
                            <form className="form-inline">
                                <div className="form-group">
                                    <label htmlFor="exampleInputName2">#</label>
                                    <input type="text" className="form-control" id="exampleInputName2"
                                           placeholder="Greeicy cosita"/>
                                </div>
                                <button type="submit" className="btn btn-default">Search</button>
                            </form>
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
        );
    }
}

export default CreateEvent;