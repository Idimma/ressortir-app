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
const gasDistribution = [
    {
        size: '12.5KG',
        amount: 4500,
        image: 'https://ressortir.com/images/products/12_5kg.png'
    },
    {
        size: '12.5KG + Cylinder',
        amount: 15750,
        description: 'Purchase 12.5kg Ressortir branded Gas Cylinder',
    },
    {
        size: '20KG',
        amount: 7000,
        image: 'https://ressortir.com/images/products/20kg.png'
    },
    {
        size: '25KG',
        amount: 8500,
        image: 'https://ressortir.com/images/products/25kg.png'
    }, {
        size: '50KG',
        amount: 17000,
        image: 'https://ressortir.com/images/products/50kg.png'
    },
]

const payments = [
    {
        key: 'Pay Online (Paystack)',
        value: 'Pay Online', icon: 'smart-card'
    },
    {
        key: 'Pay cash on delivery',
        value: 'Cash on delivery', icon: 'printer-pos'
    },
    {
        key: 'Pay using POS Machine on delivery',
        value: 'POS Machine on delivery', icon: 'truck-delivery'
    }
]

const Diesel = ({navigation, route}) => {
    useEffect(() => {
        loadProfile();
    }, [])

    const {auth: {isLoggedIn, user: {phone, email, name}}} = useContext(AuthContext);
    const [showProfile, setShowProfile] = useState(true);
    const sheetRef = useRef(null);
    const payment_method = useRef(null);
    const showPayment = useRef(null);
    const gas_size = useRef(null);
    const [selectedArea, setSelectedArea] = useState('');
    const [gas, setGas] = useState({});
    const refs = {};
    const [payment, setPayment] = useState({});
    const areas = ['Agungi', 'Chevron', 'Chisco', 'Ikate', 'Jakande', 'Marwa'];
    return (
        <Container>
            <View primary>
                <NavBar
                    variant="ghost"
                    onLeftIconPress={() => navigation.goBack()}
                    renderLeftComponent={() => (
                        <Text title white>Diesel Request</Text>
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
                        payment_option: 'Pay Online',
                        name, email, phone, size: '',
                        quantity: '',
                        service: 'diesel'
                    }}
                    enableReinitialize
                    validationSchema={
                        Yup.object().shape({
                            phone: Yup.string().min(9, 'Phone number is too short').required('Phone number is required'),
                            delivery_address: Yup.string().required('Delivery Address is required'),
                            quantity: Yup.number().min(1000, 'Quantity can not be less than 1000liters').required('Quantity is required'),
                            name: Yup.string().min(3, 'Name is too short').required('Name is required'),
                        })}
                    onSubmit={(values, actions) => {
                        AppService.createOrder(values).then(() => {
                            showSuccess('Order Created Successfully');
                            navigation.navigate(isLoggedIn?'Orders': 'Home')
                        }).catch(catchError).finally(() => {
                            actions.setSubmitting(false);
                        });
                    }}
                >
                    {({handleSubmit, values, handleBlur, setFieldValue, errors, handleChange, isSubmitting}) => (
                        <View flex>
                            {showProfile ?
                                <DetailsForm
                                    service="Diesel"
                                    addEmail={!isLoggedIn}
                                    refs={refs}
                                    errors={errors}
                                    values={values}
                                    handleBlur={handleBlur}
                                    handleChange={handleChange}
                                    isLoading={isSubmitting}
                                    title={'Confirm Your Order'}
                                    onClick={() => {
                                        if (!values.name || !values.phone || !values.email) {
                                            if (refs.phone) refs.phone.focus()
                                            return
                                        }
                                        setShowProfile(false)
                                    }}
                                /> :
                                <View>
                                    {/*<Text title my={15}>*/}
                                    {/*    DIESEL REQUEST SPECIFICATION*/}
                                    {/*</Text>*/}
                                    <Text my={20}>
                                        Kindly note that the Minimum Quantity of Diesel that can be requested is
                                        1000Litres
                                    </Text>


                                    <Card style={styles.card}>
                                        <TextField
                                            mb={0}
                                            label="Quantity"
                                            onChangeText={handleChange('quantity')}
                                            onBlur={handleBlur('quantity')}
                                            value={values.quantity}
                                            error={errors.quantity}
                                            refs={r => refs.quantity = r}
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
                                            returnKeyType={'next'}
                                        />

                                    </Card>


                                    <Button isLoading={isSubmitting} onPress={handleSubmit} label="Request a Quote"/>
                                </View>
                            }
                        </View>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        </Container>
    )
}

export default Diesel
