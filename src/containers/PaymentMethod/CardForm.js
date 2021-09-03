import React, { useState } from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import { catchError, showError, showSuccess } from '../../utils';

import { AppService } from '../../services';
import Colors from 'themes/colors';
import { PAYSTACK_PUBLIC_KEY } from '../../utils/Constants';
import { Paystack } from 'react-native-paystack-webview';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
    flex: {
        flex: 1,
    },
    form: {
        backgroundColor: Colors.white,
        paddingHorizontal: scale(14),
        paddingTop: scale(24),
        paddingBottom: scale(14),
    },
    row: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
    divider: {
        marginHorizontal: scale(7),
    },
    card: {
        marginBottom: scale(14),
    },
    header: {
        padding: scale(14),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    text: {
        fontSize: scale(10),
    },
    secure: {
        marginLeft: scale(5),
    },
    shield: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    buttonContainer: {
        padding: scale(14),
    },
});

const CardForm = ({ values: data, isLoggedIn, navigation, onCancel }) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const refs = {};
    return (
        <SafeAreaView style={styles.flex}>
            <Paystack
                paystackKey={PAYSTACK_PUBLIC_KEY}
                amount={data.amount * 100}
                billingEmail={data.email}
                activityIndicatorColor="green"
                onCancel={() => {
                    onCancel();
                    showError('You cancel the payment')
                }}
                onSuccess={(response) => {
                    data.transaction_reference = response.reference;
                    AppService.createOrder(data).then(() => {
                        showSuccess('Order Created Successfully');
                        navigation.navigate(isLoggedIn ? 'Orders' : 'Home')
                    }).catch(catchError)
                }}
                autoStart={true}
            />
            {/* <Formik
                initialValues={{
                    cardNumber: '',
                    email: data.email,
                    expiryMonth: '',
                    expiryYear: '',
                    cvc: ''
                }}
                enableReinitialize
                validationSchema={Yup.object()
                    .shape({
                        cardNumber: Yup.string()
                            .min(16, 'Card number too short!')
                            .required('Card number is required'),
                        expiryMonth: Yup.string()
                            .required('Expiration Month'),
                        expiryYear: Yup.string()
                            .required('Expiration Year'),
                        cvc: Yup.number()
                            .required('CVC is required'),
                    })}
                onSubmit={(values, {
                    setSubmitting
                }) => {
                    setSubmitting(true);
                    RNPaystack.chargeCard({
                        ...values,
                        email: data.email,
                        cvv: Number(values.cvc),
                        amountInKobo: data.amount * 100,
                    })
                        .then(response => {
                            setSubmitting(true);
                            data.transaction_reference = response.reference;
                            AppService.createOrder(data).then(() => {
                                showSuccess('Order Created Successfully');
                                navigation.navigate(isLoggedIn ? 'Orders' : 'Home')
                            }).catch(catchError)
                        })
                        .catch(catchError)
                        .finally(() => setSubmitting(false));
                }}
            >
                {({
                      handleChange,
                      handleBlur,
                      handleSubmit,
                      isSubmitting,
                      values,
                      errors
                  }) => (
                    <>

                        <KeyboardAvoidingView>
                            <View style={styles.header}>
                                <View>
                                    <Text bold fs={18}>Card Payment</Text>
                                    <Text fs={12}>Powered by Paystack</Text>
                                </View>
                                <View style={styles.shield}>
                                    <Icon
                                        name="shield-check-outline"
                                        size={scale(22)}
                                        color={Colors.green}
                                    />
                                    <View style={styles.secure}>
                                        <Text color="green" weight="medium" style={styles.text}>SECURITY</Text>
                                        <Text color="green" weight="medium" style={styles.text}>GUARANTEED</Text>
                                    </View>
                                </View>
                            </View>
                            <View style={styles.form}>
                                <View style={[styles.row, styles.card]}>
                                    <MasterCard height={scale(40)} width={scale(40)}/>
                                    <Visa height={scale(40)} width={scale(40)}/>
                                    <Amex height={scale(40)} width={scale(40)}/>
                                </View>
                                <TextField
                                    label="Card number"
                                    keyboardType={'number-pad'}
                                    onChangeText={handleChange('cardNumber')}
                                    onBlur={handleBlur('cardNumber')}
                                    value={values.cardNumber}
                                    error={errors.cardNumber}
                                    maxLength={22}
                                    refs={r => refs.cardNumber = r}
                                    onSubmitEditing={() => {
                                        if (refs.email) {
                                            refs.email.focus();
                                        }
                                    }}
                                    returnKeyType={'next'}
                                />
                                <TextField
                                    label="Cardholder Email"
                                    disabled
                                    onChangeText={handleChange('email')}
                                    onBlur={handleBlur('email')}
                                    value={values.email}
                                    error={errors.email}
                                    refs={r => refs.email = r}
                                    onSubmitEditing={() => {
                                        if (refs.expiryMonth) {
                                            refs.expiryMonth.focus();
                                        }
                                    }}
                                    returnKeyType={'next'}
                                />
                                <Text color="gray50">Expiration (MM/YY)</Text>
                                <View style={styles.row}>
                                    <View flex row aligned spaced>
                                        <View style={styles.flex}>
                                            <TextField
                                                label="MM"
                                                maxLength={2}
                                                onChangeText={handleChange('expiryMonth')}
                                                keyboardType={'number-pad'}
                                                onBlur={handleBlur('expiryMonth')}
                                                value={values.expiryMonth}
                                                error={errors.expiryMonth}
                                                refs={r => refs.expiryMonth = r}
                                                onSubmitEditing={() => {
                                                    if (refs.expiryYear) {
                                                        refs.expiryYear.focus();
                                                    }
                                                }}
                                                returnKeyType={'next'}
                                            />
                                        </View>
                                        <Text color="gray50" mx={4} mb={'20%'} py={0} fs={40}>/</Text>
                                        <View style={styles.flex}>
                                            <TextField
                                                label="YY"
                                                maxLength={2}
                                                onChangeText={handleChange('expiryYear')}
                                                onBlur={handleBlur('expiryYear')}
                                                keyboardType={'number-pad'}
                                                value={values.expiryYear}
                                                error={errors.expiryYear}
                                                refs={r => refs.expiryYear = r}
                                                onSubmitEditing={() => {
                                                    if (refs.cvc) {
                                                        refs.cvc.focus();
                                                    }
                                                }}
                                                returnKeyType={'next'}
                                            />
                                        </View>
                                    </View>

                                    <View style={styles.divider}/>
                                    <View style={styles.flex}>
                                        <TextField
                                            label="Cvv"
                                            maxLength={3}
                                            onChangeText={handleChange('cvc')}
                                            onBlur={handleBlur('cvc')}
                                            keyboardType={'number-pad'}
                                            value={values.cvc}
                                            secureTextEntry
                                            error={errors.cvc}
                                            refs={r => refs.cvc = r}
                                            onSubmitEditing={handleSubmit}
                                            returnKeyType={'done'}
                                            renderRightComponent={() => (
                                                <IconButton
                                                    iconType="MaterialCommunityIcons"
                                                    icon="information"
                                                    size={20}
                                                    color="blue"
                                                    onPress={() => setModalVisible(true)}
                                                />
                                            )}
                                        />
                                    </View>
                                </View>
                                <Text color="gray50">
                                    I acknowledge that my card information will be used by Ressortir.
                                </Text>
                            </View>
                        </KeyboardAvoidingView>
                        <View style={styles.buttonContainer}>
                            <Button onPress={handleSubmit} label="Complete Request" isLoading={isSubmitting}/>
                        </View>
                        <CvvModal isVisible={isModalVisible} onModalClose={() => setModalVisible(false)}/>

                    </>
                )}
            </Formik> */}
        </SafeAreaView>
    );
};

CardForm.propTypes = {
    cardNumber: PropTypes.string,
    email: PropTypes.string,
    expiry: PropTypes.string,
    cvc: PropTypes.string,
};

CardForm.defaultProps = {
    cardNumber: '',
    email: '',
    expiry: '',
    cvc: '',
};

export default CardForm;

