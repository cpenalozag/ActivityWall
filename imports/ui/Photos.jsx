import React, {Component} from "react";

class Photos extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    renderPictures() {
        if (!this.props.pictures) return;
        return this.props.pictures.map((edge, i) => {
            return (
                <Picture key={i} picture={edge.node}/>
            )
        });

    }

    render() {
        return (
            <div className="wall-background" style={{"backgroundColor": this.props.background}}>
                <div className="row">
                    {this.renderPictures()}
                </div>
            </div>
        );
    }
}

export default Photos;

class Picture extends Component {
    render() {
        return (
            <div className="col-md-4">
                <div className="instagram-post">

                    <div className="scroll">

                        <section className="post-image">
                            <img className="picture" src={this.props.picture.display_url} alt=""/>
                        </section>

                        <section className="post-text">
                            <h2 className="likes">{this.props.picture.edge_liked_by.count} likes</h2>
                            {this.props.picture.edge_media_to_caption.edges[0] ?
                                <span
                                    className="text">{this.props.picture.edge_media_to_caption.edges[0].node.text}</span> : ""}

                        </section>

                    </div>
                </div>
            </div>
        );
    }
}