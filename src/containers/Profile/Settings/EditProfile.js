import * as Yup from 'yup';

import {ActivityIndicator, StyleSheet} from 'react-native';
import {Avatar, Button, Container, KeyboardAvoidingView, NavBar, TextField} from 'components';
import React, {useContext, useState} from 'react';
import {ScrollView, TextInputField, TouchableOpacity, View} from '../../../widgets';
import {Switch, Text} from '../../../components';
import {catchError, formatImage, isNull, showSuccess} from '../../../utils';

import {AuthContext} from '../../../contexts/AuthContext';
import {Formik} from 'formik';
import PropTypes from 'prop-types';
import {AuthService, UserService} from '../../../services';
import axios from 'axios/index';
import colors from '../../../themes/colors';
import {launchImageLibrary} from 'react-native-image-picker';
import {scale} from 'react-native-size-matters';
import {setAppState} from '../../../utils/NavigationRef';

const styles = StyleSheet.create({
    container: {
        padding: scale(14),
        flex: 1,
    },
    form: {
        flex: 1,
    },
    avatar: {
        alignSelf: 'center',
        marginTop: scale(14),
        marginBottom: scale(24),
    },
});
const avatar = require('../../../../assets/images/icons/6.jpg');

const EditProfile = ({navigation}) => {
    const {auth: {user: profile,}} = useContext(AuthContext);
    const refs = {};
    const [isLoading, setLoading] = useState(false);
    const [response, setImageResponse] = useState(null);
    let image = avatar;
    if (profile && profile.hasOwnProperty('avatar_url')) {
        image = {uri: profile.avatar_url}
    }
    if (response) {
        image = {uri: response.uri}
    }
    return (
        <Container backgroundColor="white">
            <NavBar title="Edit Profile" onLeftIconPress={() => navigation.goBack()}/>
            <KeyboardAvoidingView contentContainerStyle={styles.container}>
                <View style={styles.form}>
                    <ScrollView showsVerticalScrollIndicator={false} bounce={false}>
                        <Formik
                            initialValues={{...profile,}}
                            enableReinitialize
                            validationSchema={Yup.object()
                                .shape({
                                    name: Yup.string().min(3, 'Name too short!').required('Name is required'),
                                    email: Yup.string().email('Must be a valid email address').required('Email is required'),
                                    phone: Yup.string().min(3, 'Must be a valid phone number').required('Phone is required'),
                                })}
                            onSubmit={(values, {setSubmitting,}) => {
                                setSubmitting(true);
                                AuthService.update(values)
                                    .then(({data}) => {
                                        showSuccess('Profile Updated successfully');
                                        setAppState({user: data.data});
                                        navigation.goBack();
                                    })
                                    .catch((e) => {
                                        setSubmitting(false);
                                        catchError(e);
                                    });
                            }}
                        >
                            {({
                                  handleChange,
                                  handleBlur,
                                  handleSubmit,
                                  isSubmitting,
                                  setFieldValue,
                                  setFieldTouched,
                                  values,
                                  errors
                              }) => (
                                <View py={20}>

                                    <TextField
                                        label="Full Name"
                                        onChangeText={handleChange('name')}
                                        onBlur={handleBlur('name')}
                                        value={values.name}
                                        error={errors.name}
                                        onSubmitEditing={() => {
                                            if (refs.email) {
                                                refs.email.focus();
                                            }
                                        }}
                                        returnKeyType={'next'}
                                    />
                                    <View h={20}/>
                                    <TextField
                                        label="Email"

                                        onChangeText={handleChange('email')}
                                        onBlur={handleBlur('email')}
                                        value={values.email}
                                        keyboardType={'email-address'}
                                        error={errors.email}
                                        refs={r => refs.email = r}
                                        onSubmitEditing={() => {
                                            if (refs.phone) {
                                                refs.phone.focus();
                                            }
                                        }}
                                        returnKeyType={'next'}
                                    />
                                    <View h={20}/>

                                    <TextField
                                        label="Phone number"
                                        // disabled
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                        value={values.phone}
                                        keyboardType={'phone-pad'}
                                        error={errors.phone}
                                        refs={r => refs.phone = r}
                                        onSubmitEditing={() => {
                                            handleSubmit();
                                        }}
                                        returnKeyType={'done'}
                                    />
                                    <View my={20}>
                                        <Button onPress={handleSubmit} isLoading={isSubmitting}>
                                            {isSubmitting ? <ActivityIndicator color={'#fff'}/> :
                                                <Text fs={16} white center>Update Profile</Text>}
                                        </Button></View>
                                </View>)}
                        </Formik>
                    </ScrollView>
                </View>
            </KeyboardAvoidingView>
        </Container>
    );
};

EditProfile.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default EditProfile;
