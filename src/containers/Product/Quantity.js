import React from 'react';
import { Text } from 'components';
import PropTypes from 'prop-types';
import { Pill } from '../../components';
import { View } from '../../widgets';

const Quantity = ({
  onChange,
  initialValue,
  row,
  title,
  ...otherProps
}) => (
  <View white {...otherProps} >
    <View flex row={row} spaced={row}>
      <Text flex> {title ?'Select Quantity' : ' '}</Text>
      <Pill min={0} onChange={onChange} initialValue={initialValue || 1}/>
    </View>
  </View>
);

Quantity.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Quantity;
