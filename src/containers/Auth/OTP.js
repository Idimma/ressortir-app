import {Container, NavBar, PIN} from 'components';
import {StyleSheet} from 'react-native';

import FormContaienr from './FormContainer';
import PropTypes from 'prop-types';
import React, {useContext, useEffect, useState} from 'react';
import {AuthContext} from '../../contexts/AuthContext';
import {Text} from '../../components';
import {AuthService} from '../../services';
import {catchError, loadProfile, showSuccess} from '../../utils';
import {Spinner, TouchableOpacity, View} from '../../widgets';
import {
    setAppState,
    setClient,
    setToken,
    storeData,
    storeJsonData
} from '../../utils/NavigationRef';
import {APP_LOGIN, APP_TOKEN} from '../../utils/Constants';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
    form: {
        flex: 1,
        alignItems: 'center',
    },
});

const OTP = ({navigation, route}) => {
    const [code, setCode] = useState('');
    const [isLoading, setLoading] = useState(false);
    const {email} = route.params
    useEffect(() => {
        if (code.length === 6) {
            onSubmit();
        }
    }, [code]);
    const onSubmit = () => {
        return navigation.navigate('ResetPassword', {token:code, email});
    };

    return (
        <Container asGradient>
            <NavBar onLeftIconPress={() => navigation.goBack()}/>
            <FormContaienr
                title="OTP Verification"
                subtitle="We have sent a 6-digits PIN to your phone number and email for verificaiton purposes."
                buttonLabel="Continue"
                isLoading={isLoading}
                onSubmit={() => onSubmit}
            >
                <View style={styles.form}>
                    <PIN onChange={setCode}/>
                    <View central mt={50}>
                        <TouchableOpacity disabled={isLoading} onPress={() => {
                            setLoading(true);
                            AuthService.forgetPassword({email})
                                .then(({data}) => {
                                    showSuccess('OTP sent');
                                })
                                .catch(catchError)
                                .finally(() => setLoading(false));
                        }} p={10}>
                            {isLoading ? <Spinner spinnerColor={colors.primary}/> :
                                <Text primary>Resend OTP</Text>}
                        </TouchableOpacity>
                    </View>
                </View>
            </FormContaienr>
        </Container>
    );
};

OTP.propTypes = {
    navigation: PropTypes.object.isRequired,
};

export default OTP;
