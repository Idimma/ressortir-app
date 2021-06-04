import React from 'react';
import {
  Text, ProgressBar,  Card,
} from 'components';
import { View, StyleSheet } from 'react-native';
import Colors from 'themes/colors';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  bubble: {
    height: scale(10),
    width: scale(10),
    borderRadius: scale(5),
    backgroundColor: Colors.primary,
  },
  box: {
    height: scale(10),
    width: scale(10),
    backgroundColor: Colors.green,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(14),
  },
  shipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(14),
    justifyContent: 'space-between',
  },
});

const ShippingBlock = ({order}) => (
  <Card style={{ padding: scale(14) }}>
    {/*<View style={styles.row}>*/}
    {/*  <Avatar*/}
    {/*    source={require('images/misc/fedex.png')}*/}
    {/*    size={35}*/}
    {/*  />*/}
    {/*  <View style={{ marginLeft: scale(10) }}>*/}
    {/*    <Text color="gray50" font="h5">Shipping by</Text>*/}
    {/*    <Text weight="medium">FedEx Express</Text>*/}
    {/*  </View>*/}
    {/*</View>*/}
    <View style={styles.shipmentContainer}>
      <View>
        <Text weight="medium">ORDER ID #{order.id}</Text>
        <Text color="gray50" font="h5">Delivery Confirmation Code <Text bold primary fs={14} >{order.delivery_code}</Text></Text>
      </View>
    </View>
    <View style={styles.trackContainer}>
      <View style={styles.bubble} />
      <ProgressBar
        completion={0.6}
        size={2}
        indicatorIconName="truck"
      />
      <View style={styles.box} />
    </View>
    <View style={styles.labelContainer}>
      <Text color="gray50" font="h5">In Transit</Text>
      <Text color="gray50" font="h5">Destination</Text>
    </View>
  </Card>
);

ShippingBlock.propTypes = {
};

export default ShippingBlock;
