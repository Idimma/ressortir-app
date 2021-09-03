import AboutUs from 'containers/Profile/Settings/AboutUs';
import ChangePassword from 'containers/Profile/Settings/ChangePassword';
import EditProfile from 'containers/Profile/Settings/EditProfile';
import Faq from 'containers/Profile/Settings/Faq';
import NotificationSettings from 'containers/Profile/Settings/NotificationSettings';
import PrivacyPolicy from 'containers/Profile/Settings/PrivacyPolicy';
import PrivacySettings from 'containers/Profile/Settings/PrivacySettings';
import Profile from 'containers/Profile';
import React from 'react';
import Settings from 'containers/Profile/Settings';
import { createStackNavigator } from '@react-navigation/stack';

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
