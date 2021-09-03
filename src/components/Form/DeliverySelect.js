import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Visa from 'svgs/visa.svg';
import MasterCard from 'svgs/mastercard.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../Card';
import Text from '../Text';
import Checkbox from './Checkbox';

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(14),
  },
  card: {
    padding: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    marginHorizontal: scale(14),
    flex: 1,
  },
  leftContainer: {
    minWidth: scale(40),
    minHeight: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const DeliverySelect = ({
  options,
  onSelect, onChange
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onPaymentSelect = (index) => {
    setSelectedIndex(index);
    if (onSelect) {
      onSelect(index);
    }
  };

  return (
    <>
      {options.map((option, index) => {
        const isSelected = selectedIndex === index;
        return (
          <TouchableOpacity
            key={option}
            style={styles.container}
            onPress={() => {
              onPaymentSelect(index);
              onChange && onChange(option)
            }}
          >
            <Card style={styles.card}>
              <View style={styles.contentContainer}>
                <Text>{option}</Text>
              </View>
              <Checkbox value={isSelected} controlledExternally />
            </Card>
          </TouchableOpacity>
        );
      })}
    </>
  );
};

DeliverySelect.propTypes = {
  onSelect: PropTypes.func,
};

DeliverySelect.defaultProps = {
  onSelect: null,
};

export default DeliverySelect;
