import React from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {viewStyles} from "../../utils/StylesGenerator";

export class NoFeedBack extends React.Component {

    render() {
        return <TouchableWithoutFeedback  {...this.props} style={[
            viewStyles(this.props),
            this.props.style,
        ]}/>;
    }
}
