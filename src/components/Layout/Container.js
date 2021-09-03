import Colors, { colorProps } from 'themes/colors';
import { StyleSheet, View } from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.gray50,
    flex: 1,
  },
});

const Container = ({
  children, backgroundColor, asGradient, style, ...props
}) => {
  const Component = asGradient ? LinearGradient : View;
  const componentProps = asGradient ? {
    colors: [Colors.tertiary, Colors.primaryAlt, Colors.primary],
    start: { x: 0, y: 0 },
    end: { x: 1, y: 0 },
  } : {};

  return (
    <Component
      style={StyleSheet.flatten([
        styles.container,
        { backgroundColor: Colors[backgroundColor] },
        style,
      ])}
      {...componentProps}
      {...props}
    >
      {children}
    </Component>
  );
};

Container.propTypes = {
  children: PropTypes.any.isRequired,
  style: PropTypes.any,
  backgroundColor: PropTypes.oneOf(colorProps),
  asGradient: PropTypes.bool,
};

Container.defaultProps = {
  style: null,
  backgroundColor: 'gray5',
  asGradient: false,
};

export default Container;
