import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from 'components';
import HomeStack from './home';
import OrderStack from './orderstack';
import FeedStack from './feed';
import ProfileStack from './profile';
import WalletStack from './wallet';
import UnAuthenticated from '../auth/AuthenticationStack';
import { AuthContext } from '../../contexts/AuthContext';
import Orders from "../../containers/Orders";

const Tab = createBottomTabNavigator();

export default function App() {
  const { auth: { isLoggedIn } } = useContext(AuthContext);
  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name="Home" component={HomeStack}/>
      <Tab.Screen name="New Request" component={FeedStack}/>
      {!isLoggedIn ?
        <Tab.Screen name="Account" component={UnAuthenticated}/> :
        <>
          <Tab.Screen name="Orders" component={OrderStack}/>
          <Tab.Screen name="Profile" component={ProfileStack}/>
        </>
      }
    </Tab.Navigator>
  );
}
