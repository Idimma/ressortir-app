import React, {useContext, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {Button, IconButton, KeyboardAvoidingView, Text, TextField,} from 'components';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';
import {scale} from 'react-native-size-matters';
import Amex from 'svgs/amex.svg';
import MasterCard from 'svgs/mastercard.svg';
import Visa from 'svgs/visa.svg';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import CvvModal from './CvvModal';
import {Formik} from 'formik';
import * as Yup from 'yup';
import {AppService, CardService} from '../../services';
import {catchError, showSuccess} from '../../utils';
// import random from 'lodash/random';
// import WebView from 'react-native-webview';
import RNPaystack from 'react-native-paystack';
import {AuthContext} from '../../contexts/AuthContext';
import {View} from '../../widgets';

const app = {
    monthAndSlashRegex: /^\d\d\/$/, // regex to match "MM / "
    monthRegex: /^\d\d$/, // regex to match "MM"
    cardTypes: {
        'Visa': {
            name: 'Visa',
            code: 'vs',
            security: 3,
            pattern: /^4/,
            valid_length: [16],
            formats: {
                length: 16,
                format: 'xxxx xxxx xxxx xxxx'
            }
        },
        'Mastercard': {
            name: 'Mastercard',
            code: 'mc',
            security: 3,
            pattern: /^5[1-5]/,
            valid_length: [16],
            formats: {
                length: 16,
                format: 'xxxx xxxx xxxx xxxx'
            }
        }
    }
};

app.isValidLength = function (cc_num, card_type) {
    for (let i in card_type.valid_length) {
        if (cc_num.length <= card_type.valid_length[i]) {
            return true;
        }
    }
    return false;
};

app.getCardType = function (cc_num) {
    for (let i in app.cardTypes) {
        let card_type = app.cardTypes[i];
        if (cc_num.match(card_type.pattern) && app.isValidLength(cc_num, card_type)) {
            return card_type;
        }
    }
};

app.getCardFormatString = function (cc_num, card_type) {
    for (let i in card_type.formats) {
        let format = card_type.formats[i];
        if (cc_num.length <= format.length) {
            return format;
        }
    }
};

app.removeSlash = function (e) {
    var isMonthAndSlashEntered = app.monthAndSlashRegex.exec(e.target.value);
    if (isMonthAndSlashEntered && e.key === 'Backspace') {
        e.target.value = e.target.value.slice(0, -3);
    }
};
app.isInteger = function (x) {
    return (typeof x === 'number') && (x % 1 === 0);
};

app.formatCardNumber = function (cc_num, card_type) {
    var numAppendedChars = 0;
    var formattedNumber = '';
    var cardFormatIndex = '';

    if (!card_type) {
        return cc_num;
    }

    var cardFormatString = app.getCardFormatString(cc_num, card_type);
    for (var i = 0; i < cc_num.length; i++) {
        cardFormatIndex = i + numAppendedChars;
        if (!cardFormatString || cardFormatIndex >= cardFormatString.length) {
            return cc_num;
        }

        if (cardFormatString.charAt(cardFormatIndex) !== 'x') {
            numAppendedChars++;
            formattedNumber += cardFormatString.charAt(cardFormatIndex) + cc_num.charAt(i);
        } else {
            formattedNumber += cc_num.charAt(i);
        }
    }

    return formattedNumber;
};

app.monitorCcFormat = function (value) {
    var cc_num = value.replace(/\D/g, '');
    var card_type = app.getCardType(cc_num);
    return app.formatCardNumber(cc_num, card_type);
};

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

const CardForm = ({values: data, isLoggedIn, navigation}) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const refs = {};
    return (
        <SafeAreaView style={styles.flex}>
            <Formik
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
            </Formik>
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

