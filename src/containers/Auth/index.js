import * as Yup from 'yup';

import {APP_IS_LOGGED_IN, APP_LOGIN, APP_LOGIN_PASSWORD, APP_TOKEN, APP_USER} from '../../utils/Constants';
import {Button, Container, IconButton, KeyboardAvoidingView, Text, TextField} from 'components';
import {Image, Platform, StyleSheet, TouchableOpacity, View} from 'react-native';
import {catchError, loadProfile, parseEmailOrPhone, showInfo, showSuccess} from '../../utils';
import {
    getJSONData,
    setAppState,
    setClient,
    setToken,
    storeData,
    storeJsonData
} from '../../utils/NavigationRef';

import {AuthContext} from 'contexts/AuthContext';
import {AuthService} from '../../services';
import Colors from 'themes/colors';
import FingerprintScanner from 'react-native-fingerprint-scanner';
import {Formik} from 'formik';
import PropTypes from 'prop-types';
import React from 'react';
import {getScreenWidth} from 'utils/size';
import {scale} from 'react-native-size-matters';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flex: 0.8,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: scale(24),
    },
    form: {
        flex: 1,
        backgroundColor: Colors.white,
        paddingVertical: scale(24),
        paddingHorizontal: scale(20),
        borderTopLeftRadius: scale(40),
        borderTopRightRadius: scale(40),
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
        width: getScreenWidth() / 1.4,
        resizeMode: 'contain',
    },
});

class Auth extends React.Component {
    static contextType = AuthContext;
    state = {email: '', password: '', biometryType: null};
    handleFingerPrint = () => {
        const isAndroid = Platform.OS === 'android';
        let params = {description: 'Scan your fingerprint on the device scanner to continue'};
        if (isAndroid) {
            if (Platform.Version < 23) {
                params = {onAttempt: catchError};
            } else {
                params = {title: 'Log in with ' + this.state.biometryType};
            }
        }
        FingerprintScanner.authenticate(params)
            .then(this.authorizedLogin)
            .catch(catchError);
    };

    componentWillUnmount = () => FingerprintScanner.release();

    async componentDidMount() {
        const _auth = await getJSONData(APP_LOGIN_PASSWORD, {email: '', password: ''});
        setAppState({auth: _auth});
        this.setState({email: _auth?.email});
        FingerprintScanner
            .isSensorAvailable()
            .then(biometryType => this.setState({biometryType}))
            .catch(error => this.setState({errorMessage: error.message}));
    }

    authorizedLogin = async () => {
        const auth = await getJSONData(APP_LOGIN_PASSWORD, {email: '', password: ''});
        this.setState({password: auth?.auth?.password});
        this.login(auth);
    };

    login = (values) => {
        this.setState({isLogging: true});
        try {
            AuthService.login({
                email: values.email,
                password: values.password || this.state.password,
            },)
                .then(async ({data: {data}}) => {
                    showSuccess('Successfully logged in');
                    setToken(data.token);
                    await storeJsonData(APP_LOGIN, data);
                    await storeJsonData(APP_LOGIN_PASSWORD, values);
                    await storeData(APP_TOKEN, data.token);
                    await storeJsonData(APP_USER, data.user);
                    await storeData(APP_IS_LOGGED_IN, 'true');
                    loadProfile();
                    setAppState({isLoggedIn: true, user: data.user});
                })
                .catch(async (e) => {
                    this.setState({isLogging: false});
                    return catchError(e);
                });
        } catch (e) {
            catchError(e);
            this.setState({isLogging: false});
        }
    };

    render() {
        let {navigation} = this.props;
        const {biometryType, email, password} = this.state;
        const {auth} = this.context;
        return (
            <Container backgroundColor={'gray10'}>
                <KeyboardAvoidingView contentContainerStyle={styles.container}>
                    <View style={styles.header}>
                        <Image
                            source={{uri: 'https://ressortir.com/images/logo/ressortir-logo.png'}}
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
                            initialValues={{email, password}}
                            enableReinitialize
                            validationSchema={Yup.object()
                                .shape({
                                    password: Yup.string()
                                        .min(6, 'Password too short!')
                                        .required('Password is required'),
                                    email: Yup.string().email('Must be a valid email')
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
                                        label="Email Address"
                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType={'email-address'}
                                        error={errors.email}
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
                        {/*<View style={styles.signUpContainer}>*/}
                        {/*    <Text>{'Don\'t have an account?'}</Text>*/}
                        {/*    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>*/}
                        {/*        <Text weight="medium" color="primary"> Sign up now!</Text>*/}
                        {/*    </TouchableOpacity>*/}
                        {/*</View>*/}
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
