import React from 'react';
import {  StyleSheet } from 'react-native';
import { Text, Button, Checkbox } from 'components';
import Colors from 'themes/colors';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import { View } from '../../widgets';
import { Naira } from '../../utils';


const Footer = ({  details, count, navigation }) => (
  <View white px={24} py={10} bc={Colors.gray10} bt={1}>
    <View row aligned spaced>
      <View >
        <View row aligned>
          <Text>Subtotal: </Text>
          <Text
            font="p1"
            weight="medium"
            color="tertiary"
          >
            {Naira}{details.total_price || 0}
          </Text>
        </View>
        {/*<Text color="tertiary" font="h5">Earn 130 Coins</Text>*/}
      </View>
      <Button label={`Checkout (${count})`}
        onPress={() => navigation.navigate('Checkout')}
      />
    </View>
  </View>
);

Footer.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Footer;
