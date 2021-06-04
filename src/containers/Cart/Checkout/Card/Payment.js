import React, { useContext, useRef, useState } from 'react';
import { StyleSheet, } from 'react-native';
import { BottomSheet, Card, PaymentSelect, Text, } from 'components';
import { scale } from 'react-native-size-matters';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Colors from 'themes/colors';
import { getProfile } from 'mocks/me';
import { getScreenHeight } from 'utils/size';
import isEmpty from 'lodash/isEmpty';
import { AuthContext } from '../../../../contexts/AuthContext';
import { formatMoney, Naira,isIOS } from '../../../../utils';
import { TouchableOpacity, View } from '../../../../widgets';

const styles = StyleSheet.create({
  card: {
    padding: scale(14),
    marginBottom: scale(14),
  },

  leftContainer: {
    minWidth: scale(40),
    minHeight: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },

  contentContainer: {
    marginHorizontal: scale(14),
    flex: 1,
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
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,

  },
  select: {
    marginBottom: scale(14),
  },
});

const PaymentCard = ({onChange}) => {
  const [payment, setPayment] = useState({});
  const sheetRef = useRef(null);
  const { cards, wallet, carts } = useContext(AuthContext).auth;
  return (
    <Card style={styles.card}>
      <View style={styles.header}>
        <View style={styles.content}>
          <Text>Payment Method</Text>
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
        {isEmpty(payment)
          ? <Text color="blue">Please select a payment method</Text>
          : (
            <>
              {payment.Icon}
              <View style={styles.content}>
                <Text weight="medium">{payment.title}</Text>
                <Text color="gray75">{payment.subtitle}</Text>
              </View>
              <Icon
                name="check-circle"
                size={scale(20)}
                color={Colors.blue}
              />
            </>
          )}
      </TouchableOpacity>
      <View style={styles.payment}>
        <View style={styles.divider}/>
        <View style={styles.row}>
          <Text weight="medium">Total Payment</Text>
          <Text weight="medium" color="primary" font="p1">{Naira + carts.details.total_price}</Text>
        </View>
      </View>
      <BottomSheet sheetRef={sheetRef} buttonText="Confirm" height={getScreenHeight() / 1.5}>
        <View  style={styles.sheet}>
          <Text title fs={isIOS ? 18 : 16} weight="medium" style={styles.select}>Select payment:</Text>
          <PaymentSelect onSelect={setPayment} onChange={onChange} options={[...cards,
            {
              title: 'Pay Code',
              subtitle: 'Pay with system generated codes',
              icon: 'qrcode',
              type: 'code',
              iconColor: Colors.blue,
            },
            {
              title: 'Wallet (' + Naira + formatMoney(wallet?.withdrawable_balance || 0) + ')',
              subtitle: ' Pay with current wallet balance',
              icon: 'wallet',
              type: 'wallet',
              iconColor: Colors.tertiary,
            },
          ]}/>
        </View>
      </BottomSheet>
    </Card>
  );
};

export default PaymentCard;
