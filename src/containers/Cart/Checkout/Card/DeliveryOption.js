import React, { useRef, useState } from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { BottomSheet, Card, DeliverySelect, Text, } from 'components';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from 'themes/colors';
import { getScreenHeight } from 'utils/size';
import { Naira } from '../../../../utils';

const styles = StyleSheet.create({
  card: {
    padding: scale(14),
    marginBottom: scale(14),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    marginHorizontal: scale(14),
    flex: 1,
  },
  payment: {
    marginTop: scale(14),
  },
  divider: {
    borderWidth: StyleSheet.hairlineWidth,
    marginVertical: scale(14),
    borderColor: Colors.gray25,
    borderStyle: 'dashed',
  },
  method: {
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.blue,
    borderRadius: scale(8),
    marginTop: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
    padding: scale(14),
    backgroundColor: Colors.blueAlt,
  },
  sheet: {
    padding: scale(14),
    flex: 1,
  },
  select: {
    marginBottom: scale(14),
  },
});

const DeliveryOption = ({ onChange}) => {

  const [delivery, setDelivery] = useState(null);
  const sheetRef = useRef(null);
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.content}>
          <Text>Delivery Option</Text>
        </View>
        <View style={styles.row}>
          <TouchableOpacity onPress={() => sheetRef.current.open()}>
            <Text color="gray50">Select</Text>
          </TouchableOpacity>
          <Icon
            name="chevron-right"
            color={Colors.gray25}
            size={scale(20)}
          />
        </View>
      </View>
      <TouchableOpacity style={styles.method} onPress={() => sheetRef.current.open()}>
        <Text color="blue">{
          delivery === null ? 'Please select a delivery method' :
            'Your selected method of delivery is ' + (delivery ? 'paid' : 'free') + ' delivery'
        }</Text>
      </TouchableOpacity>
      {delivery !== null ?
      <View style={styles.payment}>
        <View style={styles.divider}/>
        <View style={styles.row}>
          <Text weight="medium">Delivery Fee</Text>
          <Text weight="medium" color="primary" font="p1">{delivery ? `${Naira}500` : 'Free'}</Text>
        </View>
      </View> : <View/>}
      <BottomSheet sheetRef={sheetRef} buttonText="Confirm" height={getScreenHeight() / 1.5}>
        <View style={styles.sheet}>
          <Text weight="medium" style={styles.select}>Select Method:</Text>
          <DeliverySelect
            onSelect={v => {
              setDelivery(v)
             onChange && onChange(v)
            }}
            options={['Free', 'Paid']}
          />
        </View>
      </BottomSheet>
    </Card>
  );
};

export default DeliveryOption;
