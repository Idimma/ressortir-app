import React from 'react';
import {ScrollView} from 'react-native';
import {viewStyles} from "../../utils/StylesGenerator";

export class Qcroll extends React.Component {

    render() {
        return <ScrollView  {...this.props} style={[
            viewStyles(this.props),
            this.props.style,
        ]}/>;
    }
}
