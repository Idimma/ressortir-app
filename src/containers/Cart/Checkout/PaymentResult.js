import React, { useState } from 'react';
import { Button, Coin, Container, Text, } from 'components';
import { SafeAreaView, StatusBar, StyleSheet, } from 'react-native';
import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import { View } from '../../../widgets';
import { addDays } from 'date-fns';
import { catchError, formatMoney, Naira, showSuccess } from '../../../utils';
import { OrderService } from '../../../services';

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    padding: scale(14),
  },
  header: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: scale(14),
  },
  buttonContainer: {
    paddingVertical: scale(10),
  },
  flex: {
    flex: 1,
  },
  detail: {
    flex: 1,
  },
  line: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: scale(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray25,
  },
  coin: {
    marginRight: scale(10),
  },
  row: {
    flexDirection: 'row',
    flex: 1,
    alignItems: 'center',
  },
  headerText: {
    alignItems: 'center',
    paddingVertical: scale(14),
  },
  subtitle: {
    marginVertical: scale(10),
  },
});

const Line = ({
  label,
  value,
  showCoin
}) => (
  <View style={styles.line}>
    <Text flex mr={5} color="gray50">{label}:</Text>
    <View style={styles.row}>
      {showCoin && (<Coin color="primary" size={16} style={styles.coin}/>)}
      <Text weight="medium">{' ' + value}</Text>
    </View>
  </View>
);

const PaymentResult = ({
  navigation,
  route
}) => {
  const [isLoading, setLoading] = useState(false);
  const {
    request,
    data
  } = route.params;
  const [status, setStatus] = useState('Proceed');
  const [order, setOrder] = useState({});
  const [error, setError] = useState({});
  const pay = () => {
    if (status === 'Failed') {
      return navigation.goBack();
    }

    if (status === 'Success') {
      return navigation.navigate('Profile');
    }

    setLoading(true);
    return OrderService.create(request)
      .then(({ data }) => {
        setLoading(false);
        setOrder(data.data);
        setStatus('Success');
        showSuccess('Products ordered successfully');
      })
      .catch((e) => {
        setLoading(false);
        setStatus('Failed');
        // if (error.response) {
        //   const data = error.response.data;
        //   setError(data.message);
        // }
        catchError(e, setError);
      });
  };
  console.log(data);

  const render = () => {
    if (status === 'Failed') {
      return (
        <>
          <View style={styles.header}>
            <Icon
              size={scale(100)}
              name="close-circle"
              color={Colors.tertiary}
            />
            <View style={styles.headerText}>
              <Text font="h2" weight="medium">Payment failed</Text>
              <Text
                color="red"
                centered
                style={styles.subtitle}
              >
                {/*Please check your internet connection and try again later.*/}
                {'\n\n' + error}
              </Text>
            </View>
          </View>
          {/*<View style={styles.detail}>*/}
          {/*  <Line label="Error Code" value="E2003"/>*/}
          {/*  <Line label="Payment ID" value="284040382019"/>*/}
          {/*</View>*/}
        </>
      );
    }
    if (status === 'Success') {
      return (
        <>
          <View style={styles.header}>
            <Icon
              size={scale(100)}
              name="check-circle"
              color={Colors.green}
            />
            <View style={styles.headerText}>
              <Text font="h2" weight="medium">Order placed successfully</Text>
              <Text
                color="gray75"
                centered
                style={styles.subtitle}
              >
                We have sent you the receipt to your mailbox.
              </Text>
            </View>
          </View>
          <View style={styles.detail}>
            <Line label="Order ID" value={order?.id || ' '}/>
            <Line label="Amount Paid" value={Naira + formatMoney(data?.details?.total_price)}/>
            <Line label="Coins Reward" value="600" showCoin/>
          </View>
        </>
      );
    }
    const next = addDays(new Date(), 6);
    const isDelivery = data?.details?.delivery;
    return (
      <>
        <View style={styles.header}>
          <Icon
            size={scale(100)}
            name="head-question-outline"
            color={Colors.yellow}
          />
          <View style={styles.headerText}>
            <Text font="h2" weight="medium">Confirm your order</Text>
            <Text
              color="gray75"
              centered
              style={styles.subtitle}
            >
              Your order look like.
            </Text>
          </View>
        </View>
        <View style={styles.detail}>
          <Line label="Mode" value={data?.details?.delivery ? 'Delivery' : 'Pickup'}/>
          <Line
            label={'Ordered At '}
            value={data?.details?.created_at}/>
          <Line label="Address"
                value={isDelivery ? data?.details?.delivery_address?.address || ' ' : data?.details?.distributor?.address || ' '}/>
          <Line label="Amount" value={Naira + formatMoney(data?.details?.total_price)}/>
          <Line label="Coins Reward" value="600" showCoin/>
        </View>
      </>
    );
  };

  return (
    <Container style={styles.container}>
      <StatusBar barStyle="dark-content"/>
      <SafeAreaView style={styles.flex}>
        {render()}
        <View style={styles.buttonContainer}>
          <Button isLoading={isLoading} label={status} onPress={pay}/>
        </View>
      </SafeAreaView>
    </Container>
  );
};

PaymentResult.propTypes = {
  navigation: PropTypes.object.isRequired,
};

Line.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  showCoin: PropTypes.bool,
};

Line.defaultProps = {
  showCoin: false,
};

export default PaymentResult;
