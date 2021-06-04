import { StyleSheet, TouchableOpacity } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'components';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(10),
    paddingVertical: verticalScale(6),
    backgroundColor: Colors.gray10,
    borderRadius: scale(4),
    marginRight: scale(10),
    marginTop: scale(10),
  },
  selected: {
    backgroundColor: Colors.primaryBg,
  },
});

const FilterButton = ({ label, onPress, isSelected }) => (
  <TouchableOpacity
    onPress={() => onPress(label)}
    style={[
      styles.container,
      isSelected && styles.selected,
    ]}
  >
    <Text color={isSelected ? 'white' : 'gray75'}>
      {label}
    </Text>
  </TouchableOpacity>
);

FilterButton.propTypes = {
  label: PropTypes.string.isRequired,
  onPress: PropTypes.func.isRequired,
  isSelected: PropTypes.bool.isRequired,
};

export default FilterButton;
