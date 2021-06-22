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
import CardForm from "../PaymentMethod/CardForm";

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

const Gas = ({navigation, route}) => {
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
                        <Text title white>Gas Request</Text>
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
                        delivery_address: '', payment_option: 'Pay Online',
                        name, email, phone,
                        service: 'gas', size: ''
                    }}
                    enableReinitialize
                    validationSchema={
                        Yup.object().shape({
                            phone: Yup.string().min(9, 'Phone number is too short').required('Phone number is required'),
                            delivery_address: Yup.string().required('Delivery address is required'),
                            name: Yup.string().min(3, 'Name is too short').required('Name is required'),
                            // size: Yup.string().required('Gas size is required'),
                            email: Yup.string().email().required('Email is required'),
                        })}
                    onSubmit={(values, actions) => {
                        if (!values.size) {
                            return showError('Gas size is required');
                        }

                        if (values.payment_option === 'Pay Online') {
                            try {
                               showPayment.current.open()
                            } catch (e) {
                                catchError(e)
                                actions.setSubmitting(false);
                            }
                            return
                        }

                        AppService.createOrder(values).then(() => {
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
                                    service="Gas"
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
                                    <Text title my={15} center>Complete your Order</Text>

                                    <Card style={styles.card}>
                                        <View style={styles.header}>
                                            <View style={styles.content}><Text>Gas Size</Text></View>
                                            <View style={styles.row}>
                                                <TouchableOpacity onPress={() => gas_size.current.open()}>
                                                    <Text color="gray50">Select</Text>
                                                </TouchableOpacity>
                                                <Icon
                                                    name="chevron-right"
                                                    color={Colors.gray25}
                                                    size={scale(20)}
                                                />
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.method} onPress={() => gas_size.current.open()}>
                                            {isEmpty(gas)
                                                ? <Text color="blue">Select Gas Size</Text>
                                                : (
                                                    <>
                                                        <View row flex>
                                                            {gas.image &&
                                                            <Image style={styles.image} resizeMode={'contain'}
                                                                   source={{uri: gas.image}}/>}
                                                            <View>
                                                                <Text mb={8} fs={18}
                                                                      bold>{gas.image ? gas.size : gas.description}</Text>
                                                                <Text success>{Naira + gas.amount}</Text>
                                                            </View>
                                                        </View>
                                                        <Checkbox value={true} controlledExternally/>
                                                    </>
                                                )}
                                        </TouchableOpacity>

                                        <BottomSheet sheetRef={gas_size} buttonText="Confirm"
                                                     height={getScreenHeight() / 1.5}>
                                            <View style={styles.sheet}>
                                                <Text title fs={isIOS ? 18 : 16} weight="medium" style={styles.select}>
                                                    Select Gas Size:
                                                </Text>
                                                <ScrollView bounces={false} showsVerticalScrollIndicator={false}>
                                                    {
                                                        gasDistribution.map((gasSize, index) => {
                                                            return (
                                                                <TouchableOpacity
                                                                    card mb={12}
                                                                    onPress={() => {
                                                                        setGas(gasSize)
                                                                        setFieldValue('size', gasSize.image ? gasSize.size : gasSize.description)
                                                                        setFieldValue('amount', gasSize.amount)
                                                                        gas_size.current.close()
                                                                    }}
                                                                    row spaced aligned p={20} key={'gas-size' + index}>
                                                                    <View row flex>
                                                                        {gasSize.image &&
                                                                        <Image style={styles.image}
                                                                               resizeMode={'contain'}
                                                                               source={{uri: gasSize.image}}/>}
                                                                        <View><Text mb={8} fs={16}
                                                                                    medium>{gasSize.image ? gasSize.size : gasSize.description}</Text>
                                                                            <Text
                                                                                success>{Naira + gasSize.amount}</Text>
                                                                        </View>
                                                                    </View>
                                                                    <Checkbox value={gasSize.size === gas.size}
                                                                              controlledExternally/>
                                                                </TouchableOpacity>
                                                            )
                                                        })
                                                    }
                                                </ScrollView>
                                            </View>
                                        </BottomSheet>
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
                                                sheetRef.current.open()
                                            }}
                                            returnKeyType={'next'}
                                        />

                                    </Card>

                                    <Card style={styles.card}>
                                        <View style={styles.header}>
                                            <View style={styles.content}>
                                                <Text>Deliveries are only available at selected areas.</Text>
                                            </View>
                                            <View style={styles.row}>
                                                <TouchableOpacity onPress={() => sheetRef.current.open()}>
                                                    <Text color="gray50">Select</Text>
                                                </TouchableOpacity>
                                                <Icon
                                                    name="chevron-right"
                                                    color={Colors.gray25}
                                                    size={scale(20)}
                                                />
                                            </View>
                                        </View>
                                        <TouchableOpacity spaced style={styles.method}
                                                          onPress={() => sheetRef.current.open()}>
                                            {isEmpty(selectedArea)
                                                ? <Text color="blue">Select delivery area</Text>
                                                : (
                                                    <>
                                                        <Text>{selectedArea}</Text>

                                                        <Checkbox
                                                            value={true}
                                                            controlledExternally
                                                        />
                                                    </>
                                                )}
                                        </TouchableOpacity>
                                        <BottomSheet sheetRef={sheetRef} buttonText="Confirm"
                                                     height={getScreenHeight() / 1.5}>
                                            <View style={styles.sheet}>
                                                <Text title fs={isIOS ? 18 : 16} weight="medium"
                                                      style={styles.select}>
                                                    Select Delivery Area:
                                                </Text>
                                                {
                                                    areas.map((area) => {
                                                        return (
                                                            <TouchableOpacity
                                                                card mb={20}
                                                                row spaced aligned p={20}
                                                                onPress={() => {
                                                                    setSelectedArea(area)
                                                                    setFieldValue('delivery_area', area)
                                                                    sheetRef.current.close()
                                                                }}
                                                                key={area}>
                                                                <Text bold>{area}</Text>
                                                                <Checkbox
                                                                    value={area === selectedArea}
                                                                    controlledExternally
                                                                />
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }

                                            </View>
                                        </BottomSheet>
                                    </Card>

                                    <Card style={styles.card}>
                                        <View style={styles.header}>
                                            <View style={styles.content}><Text>Payment Method</Text></View>
                                            <View style={styles.row}>
                                                <TouchableOpacity onPress={() => payment_method.current.open()}>
                                                    <Text color="gray50">Select</Text>
                                                </TouchableOpacity>
                                                <Icon
                                                    name="chevron-right"
                                                    color={Colors.gray25}
                                                    size={scale(20)}
                                                />
                                            </View>
                                        </View>
                                        <TouchableOpacity style={styles.method}
                                                          onPress={() => payment_method.current.open()}>
                                            {isEmpty(payment)
                                                ? <Text color="blue">Select Payment Option</Text>
                                                : (
                                                    <>
                                                        <View flex row>
                                                            <Icon name={payment.icon} color={Colors.primary}
                                                                  size={scale(24)}/>
                                                            <View ml={10}>
                                                                <Text mb={8} fs={16}>{payment.value}</Text>
                                                            </View>
                                                        </View>
                                                        <Checkbox
                                                            value={true}
                                                            controlledExternally
                                                        />
                                                    </>
                                                )}
                                        </TouchableOpacity>

                                        <View style={styles.payment}>
                                            <View style={styles.divider}/>
                                            <View style={styles.row}>
                                                <Text weight="medium">Gas Amount</Text>
                                                <Text weight="medium" color="primary"
                                                      font="p1">{Naira + formatMoney(gas.amount)}</Text>
                                            </View>
                                        </View>

                                        <BottomSheet sheetRef={payment_method} buttonText="Confirm"
                                                     height={getScreenHeight() / 1.5}>
                                            <View style={styles.sheet}>
                                                <Text title fs={isIOS ? 18 : 16} weight="medium" style={styles.select}>
                                                    Select Payment Method:
                                                </Text>
                                                {
                                                    payments.map((dist) => {
                                                        return (
                                                            <TouchableOpacity card mb={20} onPress={() => {
                                                                setPayment(dist)
                                                                setFieldValue('payment_option', dist.value)
                                                                payment_method.current.close()
                                                            }} row spaced aligned p={20} key={dist.value}>
                                                                <View flex row>
                                                                    <Icon name={dist.icon} color={Colors.primary}
                                                                          size={scale(24)}/>
                                                                    <View ml={10}>
                                                                        <Text mb={8} fs={16}>{dist.value}</Text>
                                                                    </View>
                                                                </View>
                                                                <Checkbox
                                                                    value={dist.value === payment.value}
                                                                    controlledExternally
                                                                />
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                            </View>
                                        </BottomSheet>

                                        <BottomSheet hideButton sheetRef={showPayment} height={getScreenHeight() / 1.5}>
                                            <View style={styles.sheet}>
                                                <CardForm values={values} isLoggedIn={isLoggedIn} navigation={navigation}/>
                                            </View>
                                        </BottomSheet>
                                    </Card>
                                    <Button  isLoading={isSubmitting} onPress={handleSubmit} label="Request a Quote"/>
                                </View>
                            }
                        </View>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        </Container>
    )
}

export default Gas
