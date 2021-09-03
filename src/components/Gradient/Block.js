import Colors from 'themes/colors';
import { LinearGradient } from 'expo-linear-gradient';
import PropTypes from 'prop-types';
import React from 'react';

const GradientBlock = ({ children, style, gradient }) => (
  <LinearGradient
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 0 }}
    colors={gradient}
    style={style}
  >
    {children}
  </LinearGradient>
);

GradientBlock.propTypes = {
  children: PropTypes.any.isRequired,
  gradient: PropTypes.array,
  style: PropTypes.any,
};

GradientBlock.defaultProps = {
  style: null,
  gradient: [Colors.tertiary, Colors.primaryAlt, Colors.primary],
};

export default GradientBlock;
