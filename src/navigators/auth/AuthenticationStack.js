import Auth from 'containers/Auth';
import ForgotPassword from 'containers/Auth/ForgotPassword';
import OTP from 'containers/Auth/OTP';
import React from 'react';
import ResetPassword from 'containers/Auth/ResetPassword';
import SignUp from 'containers/Auth/SignUp';
import { createStackNavigator } from '@react-navigation/stack';

const Stack = createStackNavigator();

function App() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="SignIn" component={Auth} />
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
      <Stack.Screen name="OTP" component={OTP} />
      <Stack.Screen name="ResetPassword" component={ResetPassword} />
    </Stack.Navigator>
  );
}

export default App;
