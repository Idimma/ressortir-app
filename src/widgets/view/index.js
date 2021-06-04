import React from 'react';
import {View} from 'react-native';
import {viewStyles} from "../../utils/StylesGenerator";

export class Qiew extends React.Component {
    render = () => {
      const props = {...this.props};
      delete props.flex
      return(<View {...props} style={[viewStyles(this.props), this.props.style,]}/>);
    }
}
