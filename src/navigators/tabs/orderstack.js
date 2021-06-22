import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Orders from '../../containers/Orders';
import OrderDetails from "../../containers/Orders/Details";

const Stack = createStackNavigator();

function OrderStack() {
    return (
        <Stack.Navigator headerMode="none">
            <Stack.Screen name="Orders" component={Orders}/>
            <Stack.Screen name="OrderDetails" component={OrderDetails}/>
        </Stack.Navigator>
    );
}

export default OrderStack;
