import React, {useContext, useEffect} from 'react';
import {Text} from 'components';
import {View} from '../../../widgets';
import {formatMoney, isIOS, loadOrder} from '../../../utils';
import {AuthContext} from "../../../contexts/AuthContext";

const Referral = () => {
    const {orders} = useContext(AuthContext).auth
    const all = [...orders.completed, ...orders.current];
    const completed = orders.completed;
    const pending = orders.current;
    const rejected = all.filter((orders) => orders.status_id === 4);
    const processing = all.filter((orders) => orders.status_id === 1);
    return (
        <View py={20}>
            <View row spaced>
                <View r={10} flex central card mr={8}>
                    <Text info bold fs={isIOS ? 16 : 13} my={6}>Total Orders</Text>
                    <Text title fs={isIOS ? 22 : 18} primary>{all.length}</Text>
                </View>
                <View r={10} flex central card ml={8}>
                    <Text info bold fs={isIOS ? 16 : 13} my={6}>Pending Orders</Text>
                    <Text title fs={isIOS ? 22 : 18} primary>{pending.length}</Text>
                </View>

            </View>
            <View mt={15} row spaced>
                <View r={10} flex central card mr={8}>
                    <Text info bold fs={isIOS ? 16 : 13} my={6}>Completed Orders</Text>
                    <Text title fs={isIOS ? 22 : 18} numberOfLines={completed.length}
                          primary>0</Text>
                </View>
                <View r={10} flex central card ml={8}>
                    <Text info bold fs={isIOS ? 16 : 13} my={6}>Cancelled Orders</Text>
                    <Text title fs={isIOS ? 22 : 18} primary>{rejected.length}</Text>
                </View>

            </View>
        </View>
    );
}

export default Referral;
