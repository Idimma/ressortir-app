import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TabBar } from 'components';
import HomeStack from './home';
import CartStack from './cart';
import FeedStack from './feed';
import ProfileStack from './profile';
import WalletStack from './wallet';
import UnAuthenticated from '../auth/AuthenticationStack';
import { AuthContext } from '../../contexts/AuthContext';

const Tab = createBottomTabNavigator();

export default function App() {
  const { auth: { isLoggedIn } } = useContext(AuthContext);

  return (
    <Tab.Navigator tabBar={TabBar}>
      <Tab.Screen name="Home" component={HomeStack}/>
      <Tab.Screen name="Shop" component={FeedStack}/>
      {!isLoggedIn ?
        <Tab.Screen name="Account" component={UnAuthenticated}/> :
        <>
          <Tab.Screen name="eWallet" component={WalletStack}/>
          <Tab.Screen name="Cart" component={CartStack}/>
          <Tab.Screen name="Profile" component={ProfileStack}/>
        </>
      }


    </Tab.Navigator>
  );
}
