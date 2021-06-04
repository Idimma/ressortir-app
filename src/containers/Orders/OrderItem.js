import React from 'react';
import {
  StyleSheet, TouchableOpacity, View,
} from 'react-native';
import {
  Text, Card,  LineItem,
} from 'components';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import toUpper from 'lodash/toUpper';
import Colors from 'themes/colors';
import { formatMoney, Naira } from '../../utils';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
    marginBottom: scale(14),
  },
  shop: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  name: {
    marginLeft: scale(14),
  },
  viewMore: {
    marginVertical: scale(14),
    paddingVertical: scale(10),
    borderTopWidth: 1,
    borderBottomWidth: 1,
    alignItems: 'center',
    borderColor: Colors.gray10,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  space: {
    marginTop: scale(14),
  },
});

const STATUS_COLOR = Object.freeze({
  completed: 'primary',
  0: 'blue',
  1: 'green',
  2: 'tertiary',
  3: 'primary',
  4: 'tertiary',
  rejected: 'red',
  cancelled: 'tertiary',
  refund: 'primaryAlt',
});

const OrderItem = ({ order,  navigation }) => {
  const { total_price: total, items: products} = order;
  const slicedProducts = products.slice(0, 2);
  const remaining = products.length - 2;
  return (
    <Card style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('OrderDetails', { order })}>
        <View>
          {slicedProducts.map((product) => <LineItem product={product} key={product.id} />)}
          {remaining > 0 && (
            <View style={styles.viewMore}>
              <Text color="gray50">{`View ${remaining} more products`}</Text>
            </View>
          )}
        </View>
        <View style={[styles.footer, remaining <= 0 && styles.space]}>
          <Text weight="medium" font="h5" color={STATUS_COLOR[order.status]}>{toUpper(order.status_readable)}</Text>
          <Text>{`Total ${Naira + formatMoney(total)}`}</Text>
        </View>
      </TouchableOpacity>
    </Card>
  );
};
OrderItem.propTypes = {
  navigation: PropTypes.object.isRequired,
  order: PropTypes.object.isRequired,
  visibleProducts: PropTypes.number.isRequired,
};

export default OrderItem;
