import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text } from 'components';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/Feather';

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
  },
});

const Order = ({value, title, subtitle, icon}) => (
  <Card style={styles.container}>
    <Text>{title}</Text>
    <View style={styles.orderContainer}>
      <View style={styles.deco}>
        <Icon
          name={icon}
          color={Colors.blue}
          size={scale(14)}
        />
      </View>
      <View style={styles.order}>
        <Text color="gray50" font="h5">{subtitle}</Text>
        <Text weight="medium" font="p1">{value}</Text>
      </View>
    </View>
  </Card>
);

export default Order;
