import Feed from 'containers/Feed';
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function FeedStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Feed" component={Feed} />
    </Stack.Navigator>
  );
}

export default FeedStack;
