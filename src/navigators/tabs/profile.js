import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from 'containers/Profile';
import Settings from 'containers/Profile/Settings';
import EditProfile from 'containers/Profile/Settings/EditProfile';
import ChangePassword from 'containers/Profile/Settings/ChangePassword';
import NotificationSettings from 'containers/Profile/Settings/NotificationSettings';
import PrivacySettings from 'containers/Profile/Settings/PrivacySettings';
import Faq from 'containers/Profile/Settings/Faq';
import PrivacyPolicy from 'containers/Profile/Settings/PrivacyPolicy';
import AboutUs from 'containers/Profile/Settings/AboutUs';

const Stack = createStackNavigator();

function ProfileStack() {
  return (
    <Stack.Navigator headerMode="none">
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ChangePassword" component={ChangePassword} />
      <Stack.Screen name="NotificationSettings" component={NotificationSettings} />
      <Stack.Screen name="PrivacySettings" component={PrivacySettings} />
      <Stack.Screen name="Faq" component={Faq} />
      <Stack.Screen name="PrivacyPolicy" component={PrivacyPolicy} />
      <Stack.Screen name="AboutUs" component={AboutUs} />
    </Stack.Navigator>
  );
}

export default ProfileStack;
