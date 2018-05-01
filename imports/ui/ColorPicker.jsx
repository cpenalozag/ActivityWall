import React from 'react';
import { ChromePicker } from 'react-color';

class ColorPicker extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            background: this.props.color,
        };

    }


    handleChangeComplete = (color) => {
        this.props.onChangeComplete(color);
        this.setState({background:color.hex});

    };

    render() {
        return <ChromePicker
            color={ this.state.background }
            onChangeComplete= {this.handleChangeComplete.bind(this)}
        />;
    }
}
export default ColorPicker;