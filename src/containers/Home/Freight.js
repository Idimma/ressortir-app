import React, {useContext, useEffect, useRef, useState} from 'react';
import {Formik} from "formik";
import * as Yup from "yup";

import {AppService} from "../../services";
import {catchError, formatMoney, isIOS, loadProfile, Naira, showError, showSuccess} from "../../utils";
import {ScrollView, TouchableOpacity, View} from "../../widgets";
import {BottomSheet, Card, Container, KeyboardAvoidingView, NavBar, Text} from "components";
import {Button, TextField} from "../../components";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import {scale} from "react-native-size-matters";
import isEmpty from "lodash/isEmpty";
import Colors from "../../themes/colors";
import Checkbox from "../../components/Form/Checkbox";
import {getScreenHeight} from "../../utils/size";
import {StyleSheet, Image} from "react-native";
import DetailsForm from "./DetailsForm";

import {AuthContext} from '../../contexts/AuthContext';

const styles = StyleSheet.create({
    card: {
        padding: scale(14),
        marginBottom: scale(14),
    },

    leftContainer: {
        minWidth: scale(40),
        minHeight: scale(40),
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: scale(60),
        height: scale(60),
        borderRadius: scale(5),
    },

    contentContainer: {
        marginHorizontal: scale(14),
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    content: {
        // marginHorizontal: scale(14),
        flex: 1,
    },
    payment: {
        marginTop: scale(14),
    },
    divider: {
        borderWidth: StyleSheet.hairlineWidth,
        marginVertical: scale(14),
        borderColor: Colors.gray25,
        borderStyle: 'dashed',
    },
    method: {
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: Colors.blue,
        borderRadius: scale(8),
        marginTop: scale(14),
        flexDirection: 'row',
        alignItems: 'center',
        padding: scale(14),
        backgroundColor: Colors.blueAlt,
    },
    sheet: {
        padding: scale(14),
        flex: 1,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,

    },
    select: {
        marginBottom: scale(14),
    },
});

const Freight = ({navigation, route}) => {
    useEffect(() => {
        loadProfile();
        return null;
    }, [])
    const {auth: {isLoggedIn, user: {phone, email, name}}} = useContext(AuthContext);
    const refs = {};
    return (
        <Container>
            <View primary>
                <NavBar
                    variant="ghost"
                    onLeftIconPress={() => navigation.goBack()}
                    renderLeftComponent={() => (
                        <Text title white>Freight Request</Text>
                    )}
                    renderRightComponent={() => (
                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center'
                        }}>
                        </View>
                    )}
                />
            </View>
            <KeyboardAvoidingView contentContainerStyle={{paddingHorizontal: 20}}>
                <Formik
                    initialValues={{
                        delivery_address: '',
                        name, email, phone,
                        service: 'freight',  pickup_address: '', goods_size: '',  goods_type: '',

                    }}
                    enableReinitialize
                    validationSchema={
                        Yup.object().shape({
                            phone: Yup.string().min(9, 'Phone number is too short').required('Phone number is required'),
                            delivery_address: Yup.string().required('Delivery Address is required'),
                            pickup_address: Yup.string().required('Pickup Address is required'),
                            email: Yup.string().email().required('Email is required'),
                            goods_type: Yup.string().required('Good Type is required'),
                            goods_size: Yup.mixed().required('Good Size is required'),
                            name: Yup.string().min(3, 'Name is too short').required('Name is required'),
                        })}
                    onSubmit={(values, actions) => {
                        AppService.createOrder(values).then(() => {
                            showSuccess('Order Created Successfully')
                            navigation.navigate(isLoggedIn ? 'Orders' : 'Home')
                        }).catch(catchError).finally(() => {
                            actions.setSubmitting(false);
                        });
                    }}
                >
                    {({handleSubmit, values, handleBlur, setFieldValue, errors, handleChange, isSubmitting}) => (
                        <View flex>
                            <DetailsForm
                                service="Freight"
                                addEmail={!isLoggedIn}
                                refs={refs}
                                errors={errors}
                                values={values}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                isLoading={isSubmitting}
                            />
                            <Text mb={8} bold>FREIGHT REQUEST SPECIFICATION</Text>
                            <Card style={styles.card}>
                                <TextField
                                    mb={0}
                                    label="Type of Goods"
                                    onChangeText={handleChange('goods_type')}
                                    onBlur={handleBlur('goods_type')}
                                    value={values.goods_type}
                                    error={errors.goods_type}
                                    refs={r => refs.goods_type = r}
                                    onSubmitEditing={() => {
                                        if(refs.goods_size){
                                            refs.goods_size.focus()
                                        }
                                    }}
                                    returnKeyType={'next'}
                                />

                            </Card>
                            <Card style={styles.card}>
                                <TextField
                                    mb={0}
                                    label="Size of Goods"
                                    onChangeText={handleChange('goods_size')}
                                    onBlur={handleBlur('goods_size')}
                                    value={values.goods_size}
                                    error={errors.goods_size}
                                    refs={r => refs.goods_size = r}
                                    onSubmitEditing={() => {
                                        if(refs.pickup_address){
                                            refs.pickup_address.focus()
                                        }
                                    }}
                                    returnKeyType={'next'}
                                />

                            </Card>
                            <Text mt={16} mb={8} bold>PICK UP AND DELIVERY LOCATION</Text>
                            <Card style={styles.card}>
                                <TextField
                                    mb={0}
                                    label="Full Pickup Address"
                                    onChangeText={handleChange('pickup_address')}
                                    onBlur={handleBlur('pickup_address')}
                                    value={values.pickup_address}
                                    error={errors.pickup_address}
                                    refs={r => refs.pickup_address = r}
                                    onSubmitEditing={() => {
                                        if(refs.delivery_address){
                                            refs.delivery_address.focus()
                                        }
                                    }}
                                    returnKeyType={'next'}
                                />

                            </Card>
                            <Card style={styles.card}>
                                <TextField
                                    mb={0}
                                    label="Full Delivery Address"
                                    onChangeText={handleChange('delivery_address')}
                                    onBlur={handleBlur('delivery_address')}
                                    value={values.delivery_address}
                                    error={errors.delivery_address}
                                    refs={r => refs.delivery_address = r}
                                    onSubmitEditing={() => {
                                        handleSubmit()
                                    }}
                                    returnKeyType={'done'}
                                />

                            </Card>

                            <Button isLoading={isSubmitting} onPress={handleSubmit} label="Request a Quote"/>
                        </View>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        </Container>
    )
}

export default Freight;
