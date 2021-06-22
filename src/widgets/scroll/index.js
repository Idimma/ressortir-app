import React from 'react';
import {ScrollView} from 'react-native';
import {viewStyles} from "../../utils/StylesGenerator";

export class Qcroll extends React.Component {
    render() {
        const props = {...this.props};
        delete props.flex
        return <ScrollView  {...props} style={[viewStyles(this.props), this.props.style,]}/>;
    }
}
