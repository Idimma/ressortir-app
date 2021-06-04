import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'components';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Feather';
import { getProfile, getDefaultAddress } from 'mocks/me';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
  orderContainer: {
    flexDirection: 'row',
    marginTop: scale(14),
  },
  deco: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.blueAlt,
  },
  order: {
    marginLeft: scale(14),
    flex: 1,
  },
});

const profile = getProfile();
const address = getDefaultAddress();

const Package = () => (
  <Card style={styles.container}>
    <Text>Receiver shipping information</Text>
    <View style={styles.orderContainer}>
      <View style={styles.deco}>
        <Icon
          name="map-pin"
          color={Colors.blue}
          size={scale(14)}
        />
      </View>
      <View style={styles.order}>
        <Text weight="medium">{profile.name}</Text>
        <Text color="gray50">{address.address}</Text>
      </View>
    </View>
  </Card>
);

export default Package;
