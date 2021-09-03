import React, {useContext, useState} from 'react';
import {Container, Divider, NavBar, Text, TextField,} from 'components';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {scale} from 'react-native-size-matters';
import FormContaienr from './FormContainer';
import {AuthContext} from '../../contexts/AuthContext';
import {AuthService} from '../../services';
import {catchError, isNumberOnly, parseEmailOrPhone, showError} from '../../utils';
import {setAppState} from '../../utils/NavigationRef';

const styles = StyleSheet.create({
    divider: {
        marginBottom: scale(30),
    },
});

const ForgotPassword = ({navigation}) => {
    const {auth: {email_or_phone}} = useContext(AuthContext).auth;
    const [errors, setErrors] = useState({});
    const [email, setEmail] = useState(!isNumberOnly(email_or_phone) ? email_or_phone : '');
    const [isLoading, setLoading] = useState(false);
    const [phone, setPhone] = useState(isNumberOnly(email_or_phone) ? parseEmailOrPhone(email_or_phone) : '');
    const onSubmit = () => {
        if ((!email && !phone)) {
            showError('Email required');
        }
        const res = {type: 'users'};
        if (!phone) {
            res.email = email;
        } else {
            res.phone = parseEmailOrPhone(phone);
        }
        setLoading(true);
        AuthService.forgetPassword(res)
            .then(({data}) => {
                setAppState({otp_code: data});
                setLoading(false);
                navigation.navigate('OTP', {
                    type: 'reset',
                    data, email
                });
            })
            .catch((e) => {
                catchError(e);
                setLoading(false);
            });
    };

    return (
        <Container asGradient>
            <NavBar onLeftIconPress={() => navigation.goBack()}/>
            <FormContaienr
                title="Forgot your password?"
                subtitle="We got your back! Let us know your email and we will send a 6-digits PIN for verification to reset your password."
                buttonLabel="Continue"
                isLoading={isLoading}
                onSubmit={onSubmit}
            >
                <TextField
                    label="Email address"
                    onChangeText={setEmail}
                    onBlur={() => setErrors({email: null})}
                    value={email}
                    keyboardType={'email-address'}
                    error={errors.email}
                    returnKeyType={'done'}
                />
            </FormContaienr>
        </Container>
    );
};

ForgotPassword.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default ForgotPassword;
