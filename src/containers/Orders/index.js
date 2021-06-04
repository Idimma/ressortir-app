import React, { useContext, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import {
  Container, NavBar, Tabs,
} from 'components';
import PropTypes from 'prop-types';
import { getOrdersWhere, getOrders } from 'mocks/orders';
import OrderList from './OrderList';
import { AuthContext } from '../../contexts/AuthContext';
import { loadOrder, loadProfile } from '../../utils';



const styles = StyleSheet.create({
  flex: {
    flex: 1,
  },
});

const Orders = ({ navigation, route }) => {
  const { selectedTab } = route.params;
const {orders} = useContext(AuthContext).auth
  const all = orders;
  useEffect(() => {
    return navigation.addListener('focus', loadOrder);
  }, [navigation]);
  const completed = orders.filter((orders) => orders.status === 3);
  const pending = orders.filter((orders) => orders.status === 0);
  const rejected = orders.filter((orders) => orders.status === 4);
  const in_transit = orders.filter((orders) => orders.status === 2);
  const processing = orders.filter((orders) => orders.status === 1);
  return (
    <Container>
      <NavBar title="My Orders" onLeftIconPress={() => navigation.goBack()} />
      <Tabs selectedTab={selectedTab}>
        <View label="All" style={styles.flex}>
          <OrderList navigation={navigation} orders={all} />
        </View>
        <View label="Pending" style={styles.flex}>
          <OrderList navigation={navigation} orders={pending} />
        </View>
        <View label="Processing" style={styles.flex}>
          <OrderList navigation={navigation} orders={processing} />
        </View>
        <View label="In Transit" style={styles.flex}>
          <OrderList navigation={navigation} orders={in_transit} />
        </View>
        <View label="Completed" style={styles.flex}>
          <OrderList
            navigation={navigation}
            orders={completed}
          />
        </View>
        <View label="Cancelled" style={styles.flex}>
          <OrderList navigation={navigation} orders={rejected} />
        </View>
      </Tabs>
    </Container>
  );
};

Orders.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Orders;
