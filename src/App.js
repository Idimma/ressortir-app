import { NavigationContainer } from '@react-navigation/native';
import AuthProvider from 'contexts/AuthContext';
import AppNavigator from 'navigators/app';
import React, { useEffect } from 'react';
import { LogBox } from 'react-native';
import 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import RNPaystack from 'react-native-paystack';
import { PAYSTACK_PUBLIC_KEY } from './utils/Constants';

RNPaystack.init({ publicKey: PAYSTACK_PUBLIC_KEY });
LogBox.ignoreLogs(['VirtualizedLists', 'componentWillReceiveProps']);

const App = () => {
	useEffect(() => {
		SplashScreen.hide();
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
