import { APP_IS_LOGGED_IN, APP_LOGIN_PASSWORD, APP_TOKEN } from '../../utils/Constants';
import {
    getJSONData,
    getStoredData,
    setAppState,
    setDispatch,
    setDropDown,
    setToken
} from '../../utils/NavigationRef';

// import Product from 'containers/Product';
// import Review from 'containers/Product/Review';
// import Checkout from 'containers/Cart/Checkout';
// import PaymentResult from 'containers/Cart/Checkout/PaymentResult';
// import AddressBook from 'containers/AddressBook';
// import NewAddress from 'containers/AddressBook/NewAddress';
// import EditAddress from 'containers/AddressBook/EditAddress';
// import PaymentMethod from 'containers/PaymentMethod';
// import NewCard from 'containers/PaymentMethod/NewCard';
// import EditCard from 'containers/PaymentMethod/EditCard';
// import Search from 'containers/Search';
// import Category from 'containers/Category';
// import Shop from 'containers/Shop';
// import Orders from 'containers/Orders';
// import OrderDetails from 'containers/Orders/Details';
// import Notification from 'containers/Notification';
// import Pay from 'containers/Pay';
// import Chat from 'containers/Chat';
// import ChatRoom from 'containers/Chat/ChatRoom';
// import NetworkList from 'containers/NetworkList';
// import WishList from 'containers/WishList';
// import SingleWish from 'containers/WishList/SingleWish';
// import AddReview from 'containers/Review';
import { AuthContext } from 'contexts/AuthContext';
import DropdownAlert from 'react-native-dropdownalert';
import React from 'react';
import { Spinner } from '../../widgets';
// import Tabs from 'navigators/tabs';
import Unauthenticated from 'navigators/auth/AuthenticationStack';
import { createNativeStackNavigator } from 'react-native-screens/native-stack';
import { enableScreens } from 'react-native-screens';
import { loadProfile } from '../../utils';

enableScreens();
const Stack = createNativeStackNavigator();

class App extends React.Component<{}> {
  static contextType = AuthContext;
  dropDownAlertRef = null;
  state = { isLoading: true }; 

  async componentDidMount() {
    setDispatch(this.context.dispatch);
    const token = await getStoredData(APP_TOKEN, null);
    const isLoggedIn = await getStoredData(APP_IS_LOGGED_IN, null);
    const auth = await getJSONData(APP_LOGIN_PASSWORD, {  email_or_phone: '', password: ''});
    if (auth.password) {
      setAppState({ auth });
    }
    if (token) {
      setToken(token);
      loadProfile();
      if (isLoggedIn) {
        setAppState({ isLoggedIn: true });
      }
    }
    this.setState({ isLoading: false });
  }

  renderView() {
    const { isLoading } = this.state;
    if (isLoading) {
      return <Spinner/>;
    }

      return (
        <Stack.Navigator
          mode="modal"
          screenOptions={{ headerShown: false }}
        >
        <Stack.Screen name="Auth" component={Unauthenticated}/>
          {/*   <Stack.Screen name="Product" component={Product}/>
          <Stack.Screen name="Review" component={Review}/>
          <Stack.Screen name="Checkout" component={Checkout}/>
          <Stack.Screen name="PaymentResult" component={PaymentResult}/>
          <Stack.Screen name="AddressBook" component={AddressBook}/>
          <Stack.Screen name="NewAddress" component={NewAddress}/>
          <Stack.Screen name="EditAddress" component={EditAddress}/>
          <Stack.Screen name="PaymentMethod" component={PaymentMethod}/>
          <Stack.Screen name="NewCard" component={NewCard}/>
          <Stack.Screen name="EditCard" component={EditCard}/>
          <Stack.Screen name="Search" component={Search}/>
          <Stack.Screen name="Category" component={Category}/>
          <Stack.Screen name="Shop" component={Shop}/>
          <Stack.Screen name="Orders" component={Orders}/>
          <Stack.Screen name="OrderDetails" component={OrderDetails}/>
          <Stack.Screen name="Pay" component={Pay}/>
          <Stack.Screen name="Notification" component={Notification}/>
          <Stack.Screen name="Chat" component={Chat}/>
          <Stack.Screen name="ChatRoom" component={ChatRoom}/>
          <Stack.Screen name="NetworkList" component={NetworkList}/>
          <Stack.Screen name="WishList" component={WishList}/>
          <Stack.Screen name="SingleWish" component={SingleWish}/>
          <Stack.Screen name="AddReview" component={AddReview}/> */}
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
