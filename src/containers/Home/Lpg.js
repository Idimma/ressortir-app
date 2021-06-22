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

const LPG = ({navigation, route}) => {
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
    const areas = ['2.0 tons', '2.5 tons', '5 tons', '10 tons'];
    return (
        <Container>
            <View primary>
                <NavBar
                    variant="ghost"
                    onLeftIconPress={() => navigation.goBack()}
                    renderLeftComponent={() => (
                        <Text title white>LPG Request</Text>
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
                        service: 'lpg',
                    }}
                    enableReinitialize
                    validationSchema={
                        Yup.object().shape({
                            phone: Yup.string().min(9, 'Phone number is too short').required('Phone number is required'),
                            delivery_address: Yup.string().required('Delivery address is required'),
                            quantity: Yup.string().required('Quantity is required'),
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
                                service="LPG"
                                addEmail={!isLoggedIn}
                                refs={refs}
                                errors={errors}
                                values={values}
                                handleBlur={handleBlur}
                                handleChange={handleChange}
                                isLoading={isSubmitting}
                            />
                            <Card style={styles.card}>
                                <View style={styles.header}>
                                    <View style={styles.content}>
                                        <Text>Quantity.</Text>
                                    </View>
                                    <View style={styles.row}>
                                        <TouchableOpacity onPress={() => sheetRef.current.open()}>
                                            <Text color="gray50">Select</Text>
                                        </TouchableOpacity>
                                        <Icon name="chevron-right" color={Colors.gray25} size={scale(20)}/>
                                    </View>
                                </View>
                                <TouchableOpacity spaced style={styles.method}
                                                  onPress={() => sheetRef.current.open()}>
                                    {isEmpty(selectedArea)
                                        ? <Text color="blue">Select delivery area</Text>
                                        : (
                                            <>
                                                <Text>{selectedArea}</Text>
                                                <Checkbox value={true} controlledExternally/>
                                            </>
                                        )}
                                </TouchableOpacity>
                                <BottomSheet sheetRef={sheetRef} buttonText="Confirm"
                                             height={getScreenHeight() / 1.5}>
                                    <View style={styles.sheet}>
                                        <Text title fs={isIOS ? 18 : 16} weight="medium"
                                              style={styles.select}>Select Quantity </Text>
                                        {
                                            areas.map((area) => {
                                                return (
                                                    <TouchableOpacity
                                                        card mb={20}
                                                        row spaced aligned p={20}
                                                        onPress={() => {
                                                            setSelectedArea(area)
                                                            setFieldValue('quantity', area)
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

                            <Button isLoading={isSubmitting} onPress={handleSubmit} label="Request a Quote"/>
                        </View>
                    )}
                </Formik>
            </KeyboardAvoidingView>
        </Container>
    )
}

export default LPG;
