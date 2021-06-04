import * as Yup from 'yup';

import { ActivityIndicator, StyleSheet } from 'react-native';
import { Avatar, Button, Container, KeyboardAvoidingView, NavBar, TextField } from 'components';
import React, { useContext, useState } from 'react';
import { ScrollView, TextInputField, TouchableOpacity, View } from '../../../widgets';
import { Switch, Text } from '../../../components';
import { catchError, formatImage, isNull, showSuccess } from '../../../utils';

import { AuthContext } from '../../../contexts/AuthContext';
import { Formik } from 'formik';
import PropTypes from 'prop-types';
import { UserService } from '../../../services';
import axios from 'axios/index';
import colors from '../../../themes/colors';
import { launchImageLibrary } from 'react-native-image-picker';
import { scale } from 'react-native-size-matters';
import { setAppState } from '../../../utils/NavigationRef';

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

const EditProfile = ({ navigation }) => {
    const {
        auth: {
            user: profile,
        }
    } = useContext(AuthContext);
    const address = profile.delivery_address.find(item => item.default === true) || {}
    const refs = {};
    const [locations, setLocation] = useState([]);
    const [isLoading, setLoading] = useState(false);
    const [response, setImageResponse] = useState(null);
    let image = avatar;
    if (profile && profile.hasOwnProperty('avatar_url')) {
        image = { uri: profile.avatar_url }
    }
    if (response) {
        image = { uri: response.uri }
    }
    return (
        <Container backgroundColor="white">
            <NavBar
                title="Edit Profile"
                onLeftIconPress={() => navigation.goBack()}
            />
            <KeyboardAvoidingView contentContainerStyle={styles.container}>
                <View style={styles.form}>
                    <ScrollView showsVerticalScrollIndicator={false} bounce={false}>
                        <Formik
                            initialValues={{
                                ...profile, ...address,
                                use_as_delivery_address: !isNull(address)
                            }}
                            enableReinitialize
                            validationSchema={Yup.object()
                                .shape({
                                    last_name: Yup.string()
                                        .min(3, 'Last Name too short!')
                                        .required('Last Name is required'),
                                    first_name: Yup.string()
                                        .min(3, 'First Name too short!')
                                        .required('First name is required'),
                                    address: Yup.string()
                                        .min(3, 'Address Name too short!')
                                        .required('Address is required'),
                                    display_name: Yup.string()
                                        .min(3, 'Display Name too short!')
                                        .required('Display Name is required'),
                                    city: Yup.string()
                                        .min(3, 'City name too short')
                                        .required('City is required'),
                                    state: Yup.string()
                                        .required('State Name is required'),
                                    nearest_bus_stop: Yup.string()
                                        .required('Bus Stop is required')

                                })}
                            onSubmit={(values, { setSubmitting, }) => {
                                setSubmitting(true);
                                values.lga = values.nearest_bus_stop
                                UserService.updatePersonal(values)
                                    .then(({ data }) => {
                                        showSuccess('Profile Updated successfully');
                                        setAppState({ user: data.data });
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
                                <>
                                    <View mb={20} pb={20} central>
                                        <Avatar
                                            source={image}
                                            size={100}
                                            style={styles.avatar}

                                        />

                                        <TouchableOpacity onPress={() => {
                                            if (response && response.hasOwnProperty('uri')) {
                                                setLoading(true)
                                                const form = new FormData();
                                                const formatedImage = formatImage(response.uri);
                                                form.append('avatar', formatedImage)
                                                return UserService.updateAvatar(form).then((res) => {
                                                    console.log(res)
                                                    showSuccess('Avatar Updated Successfully')
                                                }).catch(catchError).finally(() => setLoading(false))
                                            }
                                            launchImageLibrary({
                                                mediaType: 'photo',
                                                includeBase64: false,
                                                maxHeight: 200,
                                                maxWidth: 200,
                                            }, setImageResponse)
                                        }} p={10}>
                                            {isLoading ? <ActivityIndicator color={colors.primary} /> :<Text center primary>{response ? 'Save Change' : 'Change Avatar'}</Text>}
                                        </TouchableOpacity>
                                    </View>

                                    <TextField
                                        label="First Name"
                                        onChangeText={handleChange('first_name')}
                                        onBlur={handleBlur('first_name')}
                                        value={values.first_name}
                                        error={errors.first_name}
                                        onSubmitEditing={() => {
                                            if (refs.last_name) {
                                                refs.last_name.focus();
                                            }
                                        }}
                                        returnKeyType={'next'}
                                    />
                                    <TextField
                                        label="Last Name"
                                        onChangeText={handleChange('last_name')}
                                        onBlur={handleBlur('last_name')}
                                        value={values.last_name}
                                        error={errors.last_name}
                                        refs={r => refs.last_name = r}
                                        onSubmitEditing={() => {
                                            if (refs.display_name) {
                                                refs.display_name.focus();
                                            }
                                        }}
                                        returnKeyType={'next'}
                                    />

                                    <TextField
                                        label="Display Name"
                                        onChangeText={handleChange('display_name')}
                                        onBlur={handleBlur('display_name')}
                                        value={values.display_name}
                                        error={errors.display_name}
                                        refs={r => refs.display_name = r}
                                        onSubmitEditing={() => {
                                            if (refs.phone) {
                                                refs.phone.focus();
                                            }
                                        }}
                                        returnKeyType={'next'}
                                    />
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
                                    <TextField
                                        label="Phone number"
                                        disabled
                                        onChangeText={handleChange('phone')}
                                        onBlur={handleBlur('phone')}
                                        value={values.phone}
                                        keyboardType={'phone-pad'}
                                        error={errors.phone}
                                        refs={r => refs.phone = r}
                                        onSubmitEditing={() => {
                                            if (refs.city) {
                                                refs.city.focus();
                                            }
                                        }}
                                        returnKeyType={'next'}
                                    />
                                    <TextInputField
                                        label="Address"
                                        type={'search'}
                                        data={locations}
                                        onChange={(text) => {
                                            if (text.length > 2) {
                                                axios.get(`https://maps.googleapis.com/maps/api/place/textsearch/json?query=${text}&key=AIzaSyDdHMB87WgSAdWlbEiORryX6ttcBiIwJC8`)
                                                    .then(({ data }) => {
                                                        setLocation(data.status === 'OK' ? data.results : []);
                                                    })
                                                    .catch(catchError);
                                            }
                                        }}
                                        onChangeText={(text, item) => {
                                            setFieldValue('address', text);
                                            setFieldValue('long', item.geometry.location.lng);
                                            setFieldValue('lat', item.geometry.location.lat);
                                        }}
                                        indexName={'formatted_address'}
                                        onFocus={handleBlur('address')}
                                        onBlur={handleBlur('address')}
                                        initialValue={values.address}
                                        value={values.address}
                                        errorText={errors.address}
                                        refs={r => refs.address = r}
                                        onSubmitEditing={handleSubmit}
                                        returnKeyType={'next'}
                                    />
                                    <View >
                                        <View flex>
                                            <TextField
                                                label="City"
                                                onChangeText={handleChange('city')}
                                                onBlur={handleBlur('city')}
                                                value={values.city}
                                                error={errors.city}
                                                refs={r => refs.city = r}
                                                onSubmitEditing={() => {
                                                    if (refs.state) {
                                                        refs.state.focus();
                                                    }
                                                }}
                                                returnKeyType={'next'}
                                            />
                                        </View>
                                        <View mx={4} flex>
                                            <TextField
                                                label="State"
                                                onChangeText={handleChange('state')}
                                                onBlur={handleBlur('state')}
                                                value={values.state}
                                                error={errors.state}
                                                refs={r => refs.state = r}
                                                onSubmitEditing={() => {
                                                    if (refs.lga) {
                                                        refs.lga.focus();
                                                    }
                                                }}
                                                returnKeyType={'next'}
                                            />
                                        </View>
                                        <View flex>
                                            <TextField
                                                label="Nearest Bus Stop"
                                                onChangeText={handleChange('nearest_bus_stop')}
                                                onBlur={handleBlur('nearest_bus_stop')}
                                                value={values.nearest_bus_stop}
                                                error={errors.nearest_bus_stop}
                                                refs={r => refs.nearest_bus_stop = r}
                                                onSubmitEditing={handleSubmit}
                                                returnKeyType={'done'}
                                            />

                                            <View aligned spaced row>
                                                <Text>Set as default</Text>
                                                <Switch initialValue={values.use_as_delivery_address} onChange={(state) => {
                                                    setFieldValue('set_default', state);
                                                }} />
                                            </View>

                                        </View>
                                    </View>
                                    <View my={20}>
                                        <Button onPress={handleSubmit} isLoading={isSubmitting}>
                                            {isSubmitting ? <ActivityIndicator color={'#fff'} /> :
                                                <Text fs={16} white center>Update Profile</Text>}
                                        </Button></View>
                                </>)}
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
