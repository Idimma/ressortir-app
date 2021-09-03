import { APP_IS_LOGGED_IN, APP_LOGIN_PASSWORD, APP_TOKEN } from '../../utils/Constants';
import { getJSONData, getStoredData, setAppState, setDispatch, setDropDown, setToken } from '../../utils/NavigationRef';

import { AuthContext } from 'contexts/AuthContext';
import Diesel from "../../containers/Home/Diesel";
import DropdownAlert from 'react-native-dropdownalert';
import Freight from "../../containers/Home/Freight";
import Gas from "../../containers/Home/Gas";
import LPG from "../../containers/Home/Lpg";
import OrderDetails from 'containers/Orders/Details';
import Orders from 'containers/Orders';
import React from 'react';
import { Spinner } from '../../widgets';
import Tabs from '../tabs';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';

enableScreens();
const Stack = createNativeStackNavigator();

class App extends React.Component {
    static contextType = AuthContext;
    dropDownAlertRef = null;
    state = {isLoading: true};

    async componentDidMount() {
        setDispatch(this.context.dispatch);
        const token = await getStoredData(APP_TOKEN, null);
        const isLoggedIn = await getStoredData(APP_IS_LOGGED_IN, null);
        const auth = await getJSONData(APP_LOGIN_PASSWORD, {email_or_phone: '', password: ''});
        if (auth.password) {
            setAppState({auth});
        }
        if (token) {
            setToken(token);
            // loadProfile();
            if (isLoggedIn) {
                setAppState({isLoggedIn: true});
            }
        }
        this.setState({isLoading: false});
    }

    renderView() {
        const {isLoading} = this.state;
        const {auth:{isLoggedIn}} = this.context;
        if (isLoading) {
            return <Spinner/>;
        }
        return (
            <Stack.Navigator mode="modal" screenOptions={{headerShown: false}}>
                <Stack.Screen name="Tabs" component={Tabs}/>
                <Stack.Screen name="Gas" component={Gas}/>
                <Stack.Screen name="Freight" component={Freight}/>
                <Stack.Screen name="Lpg" component={LPG}/>
                <Stack.Screen name="Diesel" component={Diesel}/>
                {!isLoggedIn && <>
                        <Stack.Screen name="Orders" component={Orders}/>
                        <Stack.Screen name="OrderDetails" component={OrderDetails}/>
                    </>
                }

            </Stack.Navigator>
        );
    }

    render() {
        return <>
            {this.renderView()}
            <DropdownAlert
                ref={ref => {
                    this.dropDownAlertRef = ref;
                    setDropDown(this.dropDownAlertRef);
                }}
                updateStatusBar={false}
            />
        </>;
    }
}

export default App;
