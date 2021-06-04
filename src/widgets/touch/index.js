import React from 'react';
import {TouchableOpacity} from 'react-native';
import {viewStyles} from "../../utils/StylesGenerator";

export class Qouch extends React.Component {
    render() {
        return <TouchableOpacity  {...this.props} style={[viewStyles(this.props), this.props.style,]}/>;
    }
}
