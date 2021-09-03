import React from 'react';
import {FlatList, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {scale} from 'react-native-size-matters';
import {Empty} from 'components';
import OrderItem from './OrderItem';

const styles = StyleSheet.create({
    container: {
        padding: scale(14),
        flexGrow: 1,
    },
});

const OrderList = ({orders, navigation, visibleProducts}) => (
    <FlatList
        contentContainerStyle={styles.container}
        data={orders}
        keyExtractor={(data) => data?.id?.toString()}
        showsVerticalScrollIndicator={false}
        renderItem={({item}) => (
            <OrderItem navigation={navigation} visibleProducts={visibleProducts} order={item}/>
        )}
        ListEmptyComponent={Empty}
    />
);

OrderList.propTypes = {
    navigation: PropTypes.object.isRequired,
    visibleProducts: PropTypes.number,
    orders: PropTypes.array,
};

OrderList.defaultProps = {
    visibleProducts: 2,
    orders: [],
};

export default OrderList;
