import React, { useContext } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Card, GradientIconBg, Text, } from 'components';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import { AuthContext } from '../../../../contexts/AuthContext';
import { isEmpty } from 'lodash';

const styles = StyleSheet.create({
  card: {
    marginBottom: scale(14),
  },
  container: {
    padding: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  content: {
    marginHorizontal: scale(14),
    flex: 1,
  },
});

const AddressCard = ({ navigation }) => {
  const { user } = useContext(AuthContext).auth;
  const address = user.delivery_address.find(item => item.default === true) || {};
  if (!user.delivery_address.length || isEmpty(address) ) {
    return (
      <Card style={styles.card}>
        <TouchableOpacity
          style={styles.container}
          onPress={() => navigation.navigate('AddressBook')}
        >
          <Text>Add Address Delivery Address</Text>
        </TouchableOpacity>
      </Card>
    );
  }
  return (
    <Card style={styles.card}>
      <TouchableOpacity
        style={styles.container}
        onPress={() => navigation.navigate('AddressBook')}
      >
        <GradientIconBg
          icon="map-marker"
        />
        <View style={styles.content}>
          <Text weight="medium">{address.first_name + ' ' + address.last_name}</Text>
          <Text color="gray75">{address.address}</Text>
          <Text mt={10} fs={10} color="gray75">click to change default</Text>
        </View>
        <Icon
          name="chevron-right"
          color={Colors.gray25}
          size={scale(20)}
        />
      </TouchableOpacity>
    </Card>
  );
};

AddressCard.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddressCard;
