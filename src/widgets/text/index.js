import React from 'react';
import {Text} from 'react-native';
import {textStyles} from "../../utils/StylesGenerator";

export class Qext extends React.Component {
    render() {
        return <Text  {...this.props} style={[textStyles(this.props), this.props.style,]}/>;
    }
}
