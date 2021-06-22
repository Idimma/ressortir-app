import React from 'react';
import {View} from "../../widgets";
import {Text} from "components";
import {Button, Card, TextField} from "../../components";
import {scale} from "react-native-size-matters";
import Colors from "../../themes/colors";
import {StyleSheet} from "react-native";
import {AuthContext} from "../../contexts/AuthContext";

const styles = StyleSheet.create({
    card: {
        paddingHorizontal: scale(14),
        paddingTop: scale(10),
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

const DetailsForm = ({
                         service,
                         handleChange,
                         handleBlur,
                         errors,
                         refs,
                         values,
                         onClick,
                         title,
                         isLoading,
                         addEmail
                     }) => {
    return(
        <View>
            <View  mt={25}>
                <Text  title>{service} Request Info</Text>
                <Text  mt={10}>Please make sure the details below are correct for this
                    particular order </Text>
            </View>
            <View my={30}>
                <Card style={styles.card}>
                    <TextField
                        label="Full Name"
                        onChangeText={handleChange('name')}
                        onBlur={handleBlur('name')}
                        value={values.name}
                        error={errors.name}
                        refs={r => refs.name = r}
                        onSubmitEditing={() => {
                            if (refs.phone) {
                                refs.phone.focus();
                            }
                        }}
                        returnKeyType={'next'}
                    />
                </Card>
                <Card style={styles.card}>
                    <TextField
                        label="Phone"
                        onChangeText={handleChange('phone')}
                        onBlur={handleBlur('phone')}
                        value={values.phone}
                        error={errors.phone}
                        refs={r => refs.phone = r}
                        onSubmitEditing={() => {
                            if (refs.email) {
                                refs.email.focus();
                            }
                        }}
                        returnKeyType={'next'}
                    />
                </Card>
                {
                    addEmail &&
                    <Card style={styles.card}>
                        <TextField
                            label="Email Address"
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            value={values.email}
                            error={errors.email}
                            refs={r => refs.email = r}
                            onSubmitEditing={onClick}
                            returnKeyType={'done'}
                        />
                    </Card>
                }
            </View>
            {onClick &&<Button isLoading={isLoading} label={title || ' Request a Quote'} onPress={onClick}/>}
        </View>
    );
}


export default DetailsForm
