import AppNavigator from 'navigators/app';
import AuthProvider from 'contexts/AuthContext';
import { LogBox } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { useFonts } from "expo-font";

LogBox.ignoreLogs(['VirtualizedLists', 'componentWillReceiveProps']);

const App = () => {
    const [loaded, error] = useFonts({
        bold: require("./assets/fonts/OpenSans-SemiBold.ttf"),
        medium: require("./assets/fonts/OpenSans-SemiBold.ttf"),
        regular: require("./assets/fonts/OpenSans-Regular.ttf"),
        light: require("./assets/fonts/OpenSans-Light.ttf"),
        italic: require("./assets/fonts/OpenSans-Italic.ttf"),
    });
    return (
        <AuthProvider>
            <NavigationContainer>
                <AppNavigator />
            </NavigationContainer>
        </AuthProvider>
    );
};

export default App;
