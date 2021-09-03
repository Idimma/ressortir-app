import React, { Component } from 'react';
import { ActivityIndicator, StyleSheet, Text, View, ViewPropTypes, } from 'react-native';
import PropTypes from 'prop-types';
import { PRIMARY } from '../../utils/Colors';

const {
  bool,
  any,
  string
} = PropTypes;

const Base = StyleSheet.create({
  container: {
    flex: 1,
  },
  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 8,
  },

});

class Spinner extends Component {

  static propTypes = {
    children: any,
    center: bool,
    bottom: bool,
    backHandler: bool,
    spinnerStyle: ViewPropTypes.style,
    spinnerColor: string,
    spinnerSize: string
  };

  render() {
    const {
      text,
      spinnerStyle,
      textStyle,
      spinnerColor,
      spinnerSize
    } = this.props;
    return (
      <View
        style={[
          Base.container,
          Base.centering,
          spinnerStyle
        ]}
      >
        <ActivityIndicator
          animating
          color={spinnerColor || PRIMARY}
          style={[Base.centering, {}]}
          size={spinnerSize || 'large'}
        />
        <Text style={textStyle}>{text || 'Please Wait...'}</Text>
      </View>
    );
  }
}

export { Spinner };
