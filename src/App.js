import 'react-native-gesture-handler';

import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import React, { useEffect } from 'react';

import AppNavigator from 'navigators/app';
import AuthProvider from 'contexts/AuthContext';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { PAYSTACK_PUBLIC_KEY } from './utils/Constants';
import RNPaystack from 'react-native-paystack';

RNPaystack.init({ publicKey: PAYSTACK_PUBLIC_KEY });
LogBox.ignoreLogs(['VirtualizedLists', 'componentWillReceiveProps']);

const App = () => {
	useEffect(() =>{
		(async () => await SplashScreen.hideAsync())();
	}, []);
	return (
		<AuthProvider>
			<NavigationContainer>
				<AppNavigator />
			</NavigationContainer>
		</AuthProvider>
	);
};

export default App;
