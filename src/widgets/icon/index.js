import React from 'react';
import * as Icon from "react-native-vector-icons/Ionicons";
import {textStyles} from "../../utils/StylesGenerator";

export class Qcon extends React.Component {
    render() {
        return <Icon  {...this.props} style={[
            textStyles(this.props),
            this.props.style,
        ]}/>;
    }
}
