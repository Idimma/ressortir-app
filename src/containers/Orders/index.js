import React, {useContext, useEffect} from 'react';
import {View, StyleSheet} from 'react-native';
import {Container, NavBar, Tabs} from 'components';
import PropTypes from 'prop-types';
import OrderList from './OrderList';
import {AuthContext} from '../../contexts/AuthContext';
import {loadOrder} from '../../utils';


const styles = StyleSheet.create({flex: {flex: 1,}});

const Orders = ({navigation, route}) => {
    const {auth: {isLoggedIn}} = useContext(AuthContext);

    let selectedTab = 0
    if (route.params) {
        selectedTab = route.params.selectedTab
    }
    const {orders} = useContext(AuthContext).auth
    const all = [...orders.completed, ...orders.current];
    useEffect(() => {
        return navigation.addListener('focus', loadOrder);
    }, [navigation]);
    const completed = orders.completed;
    const pending = orders.current;
    const rejected = all.filter((orders) => orders.status_id === 4);
    const processing = all.filter((orders) => orders.status_id === 1);
    return (
        <Container>
            <NavBar title="My Orders" onLeftIconPress={isLoggedIn ? null : () => navigation.goBack()}/>
            <Tabs selectedTab={selectedTab}>
                <View label="All" style={styles.flex}>
                    <OrderList navigation={navigation} orders={all}/>
                </View>
                <View label="Pending" style={styles.flex}>
                    <OrderList navigation={navigation} orders={pending}/>
                </View>
                <View label="Processing" style={styles.flex}>
                    <OrderList navigation={navigation} orders={processing}/>
                </View>
                <View label="Completed" style={styles.flex}>
                    <OrderList navigation={navigation} orders={completed}/>
                </View>
                <View label="Cancelled" style={styles.flex}>
                    <OrderList navigation={navigation} orders={rejected}/>
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
