import * as Yup from 'yup';

import { APP_IS_LOGGED_IN, APP_LOGIN, APP_LOGIN_PASSWORD, APP_TOKEN } from '../../utils/Constants';
import { Button, Container, IconButton, KeyboardAvoidingView, Text, TextField } from 'components';
import { Image, Platform, StyleSheet, TouchableOpacity, View } from 'react-native';
import { catchError, loadProfile, parseEmailOrPhone, showInfo, showSuccess } from '../../utils';
import {
    getJSONData,
    setAppState,
    setClient,
    setToken,
    storeData,
    storeJsonData
} from '../../utils/NavigationRef';

import { AuthContext } from 'contexts/AuthContext';
import { AuthService } from '../../services';
import Colors from 'themes/colors';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import { getScreenWidth } from 'utils/size';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flex: 0.4,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: scale(24),
  },
  form: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingVertical: scale(24),
    paddingHorizontal: scale(14),
    borderTopLeftRadius: scale(20),
    borderTopRightRadius: scale(20),
  },
  welcome: {
    marginBottom: scale(14),
  },
  signUpContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: scale(14),
    // flex: 1,
  },
  social: {
    width: scale(50),
    height: scale(50),
    borderRadius: scale(25),
    backgroundColor: Colors.gray5,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: scale(5),
  },
  forgot: {
    alignItems: 'flex-end',
    // flex: 1,
    marginBottom: 20
  },
  logo: {
    flex: 1,
    width: getScreenWidth() / 1.2,
    resizeMode: 'contain',
  },
});

class Auth extends React.Component {
  static contextType = AuthContext;
  state = {
    email_or_phone: '',
    password: '',
    biometryType: null
  };
  handleFingerPrint = () => {
    const isAndroid = Platform.OS === 'android';
    let params = { description: 'Scan your fingerprint on the device scanner to continue' };
    if (isAndroid) {
      if (Platform.Version < 23) {
        params = { onAttempt: catchError };
      } else {
        params = { title: 'Log in with ' + this.state.biometryType };
      }
    }
    FingerprintScanner.authenticate(params)
      .then(this.authorizedLogin)
      .catch(catchError);
  };

  componentWillUnmount = () => FingerprintScanner.release();

  async componentDidMount() {
    const _auth = await getJSONData(APP_LOGIN_PASSWORD, {  email_or_phone: '', password: ''});
    setAppState({ auth: _auth });
    this.setState({ email_or_phone: _auth?.email_or_phone });
    FingerprintScanner
      .isSensorAvailable()
      .then(biometryType => this.setState({ biometryType }))
      .catch(error => this.setState({ errorMessage: error.message }));
  }

  authorizedLogin = async () =>{
    const auth = await getJSONData(APP_LOGIN_PASSWORD, {  email_or_phone: '', password: ''});
    this.setState({ password: auth?.auth?.password });
    this.login(auth);
  };

  login = (values) => {
    this.setState({ isLogging: true });
    try {
      const email_or_phone = parseEmailOrPhone(values.email_or_phone || this.state.email_or_phone);
      AuthService.login({
        email_or_phone,
        password: values.password || this.state.password,
        client: 'user'
      },)
        .then(async ({ data: { data } }) => {
          showSuccess('Successfully logged in');
          setToken(data.access_token);
          loadProfile();
          await storeJsonData(APP_LOGIN, data);
          await storeJsonData(APP_LOGIN_PASSWORD, values);
          await storeData(APP_TOKEN, data.access_token);
          await storeData(APP_IS_LOGGED_IN, 'true');
          setClient(data.client);
          setAppState({ isLoggedIn: true, });
        })
        .catch(async (e) => {
          this.setState({ isLogging: false });
          if (e.response && e.response.status === 403) {
            showInfo(e.response.data.error);
            setAppState({ otp_code: e.response.data.data });
            return this.props.navigation.navigate('OTP', { data: e.response.data.data });
          }
          if (e.response && e.response.status === 402) {
            showInfo(e.response.data.error);
            setAppState({
              otp_code: e.response.data.data,
              user: e.response.config
            });
            const data = e.response.data.data;
            setToken(data.access_token);
            await storeJsonData(APP_LOGIN, data);
            await storeJsonData(APP_LOGIN_PASSWORD, values);

            await storeData(APP_TOKEN, data.access_token);
            loadProfile();
            return this.props.navigation.navigate('AccountPayment');
          }
          return catchError(e);
        });
    } catch (e) {
      catchError(e);
      this.setState({ isLogging: false });
    }
  };

  render() {
    let { navigation } = this.props;
    const {
      biometryType,
      email_or_phone,
      password
    } = this.state;
    const { auth } = this.context;
    return (
      <Container asGradient>
        <KeyboardAvoidingView contentContainerStyle={styles.container}>
          <View style={styles.header}>
            <Image
              source={require('images/branding/logo_with_title.png')}
              style={styles.logo}
            />
          </View>
          <View style={styles.form}>
            <View style={styles.welcome}>
              <Text font="h2" bold>Welcome back!</Text>
              <Text pt={10} pb={20}>
                Please login with your email address and password to
                continue.
              </Text>
            </View>
            <Formik
              initialValues={{
                email_or_phone,
                password
              }}
              enableReinitialize
              validationSchema={Yup.object()
                .shape({
                  password: Yup.string()
                    .min(6, 'Password too short!')
                    .required('Password is required'),
                  email_or_phone: Yup.string()
                    .required('Field is required'),
                })}
              onSubmit={this.login}
            >
              {({
                handleChange,
                handleBlur,
                handleSubmit,
                values,
                errors
              }) => (
                <View>
                  <TextField
                    label="Email or Username or Phone "
                    onChangeText={handleChange('email_or_phone')}
                    onBlur={handleBlur('email_or_phone')}
                    value={values.email_or_phone}
                    keyboardType={'email-address'}
                    error={errors.email_or_phone}
                    refs={r => this.email = r}
                    onSubmitEditing={() => {
                      if (this.password) {
                        this.password.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
                  <TextField
                    label="Password"
                    secureTextEntry
                    refs={r => this.password = r}
                    error={errors.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    onSubmitEditing={handleSubmit}
                    returnKeyType={'done'}

                    renderRightComponent={() => {
                      if (biometryType && auth?.auth?.password) {
                        return (
                          <IconButton
                            iconType="MaterialCommunityIcons"
                            icon="fingerprint"
                            // style={styles.social}
                            onPress={this.handleFingerPrint}
                            size={20}
                            color="blue"
                          />);
                      }
                    }}
                  />
                  <View style={styles.forgot}>
                    <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
                      <Text primary>Forgot password?</Text>
                    </TouchableOpacity>
                  </View>
                  <Button isLoading={this.state.isLogging} label="Login" onPress={handleSubmit}/>
                </View>)}
            </Formik>
            <View style={styles.signUpContainer}>
              <Text>{'Don\'t have an account?'}</Text>
              <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                <Text weight="medium" color="primary"> Sign up now!</Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Container>
    );
  }
}

Auth.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Auth;
