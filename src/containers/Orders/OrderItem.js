import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Text, Card, LineItem,} from 'components';
import PropTypes from 'prop-types';
import {scale} from 'react-native-size-matters';
import toUpper from 'lodash/toUpper';
import Colors from 'themes/colors';
import {formatMoney, Naira} from '../../utils';
import {View} from "../../widgets";

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
    '0': 'blue',
    '1': 'green',
    2: 'tertiary',
    3: 'primary',
    4: 'tertiary',
    rejected: 'red',
    cancelled: 'tertiary',
    refund: 'primaryAlt',
});
const OrderItem = ({order, navigation}) => {
    const services = {
        diesel: 'https://ressortir.com/images/sliders/diesel-m.jpg',
        gas: 'https://ressortir.com/images/sliders/gas-refill.jpeg',
        lpg: 'https://ressortir.com/images/sliders/lpg.jpg',
        freight: 'https://ressortir.com/images/sliders/freight-m.jpg',
    }
    return (
        <Card style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('OrderDetails', {order})}>
                <View>
                    <View row>
                        <Image style={{height: 60, width: 60, borderRadius: 5}}
                               source={{uri: services[order.service_name]}}/>
                        <View ml={8}>
                            <Text bold style={{
                                textTransform: 'capitalize',
                                marginBottom: 10
                            }}>{order.service_name} Request</Text>
                            <Text>Requested Date: {order.created_at}</Text>
                        </View>
                    </View>

                    <View style={styles.viewMore}>
                        <Text color="gray50">{`Track Order #${order.order_no}`}</Text>
                    </View>
                </View>
                <View style={[styles.footer,]}>
                    <Text weight="medium" font="h5"
                          color={STATUS_COLOR[order.status_id]}>{toUpper(order.status_message)}</Text>
                    <Text>{order.amount ? `Total ${Naira + ' ' + formatMoney(order.amount)}` : ''}</Text>
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
