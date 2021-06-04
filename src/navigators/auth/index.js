import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from '../../components';
import HomeStack from '../tabs/home';
import FeedStack from '../tabs/feed';
import Auth from './AuthenticationStack';

const Tab = createBottomTabNavigator();

export default function UnAuthenticated() {
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name="Home" component={HomeStack} />
      <Tab.Screen name="Shop" component={FeedStack} />
      <Tab.Screen name="Profile" component={Auth} />
    </Tab.Navigator>
  );
}