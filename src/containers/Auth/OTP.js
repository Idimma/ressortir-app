import { Container, NavBar, PIN } from 'components';
import { StyleSheet } from 'react-native';

import FormContaienr from './FormContainer';
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { Text } from '../../components';
import { AuthService } from '../../services';
import { catchError, loadProfile, showSuccess } from '../../utils';
import { Spinner, TouchableOpacity, View } from '../../widgets';
import {
  setAppState,
  setClient,
  setToken,
  storeData,
  storeJsonData
} from '../../utils/NavigationRef';
import { APP_LOGIN, APP_TOKEN } from '../../utils/Constants';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  form: {
    flex: 1,
    alignItems: 'center',
  },
});

const OTP = ({
  navigation,
  route
}) => {
  const isReset = (route.params.hasOwnProperty('type') && route.params.type === 'reset');
  const [code, setCode] = useState('');
  const [isLoading, setLoading] = useState(false);
  useEffect(() => {
    if (code.length === 6) {
      onSubmit();
    }
  }, [code]);
  const onSubmit = () => {
    otp_code.otp = code;
    if (isReset) {
      setAppState({ otp_code });
      return navigation.navigate('ResetPassword', { otp_code });
    }
    setLoading(true);
    AuthService.verifyOtp(otp_code)
      .then(async ({
        data: {
          message,
          data
        }
      }) => {
        setToken(data.access_token);
        loadProfile();
        setLoading(false);
        await storeJsonData(APP_LOGIN, data);
        await storeData(APP_TOKEN, data.access_token);
        setClient(data.client);
        navigation.navigate('AccountPayment');
        showSuccess(message);
      })
      .catch((e) => {
        catchError(e);
        setLoading(false);
      });
  };

  const { auth: { otp_code } } = useContext(AuthContext);
  return (
    <Container asGradient>
      <NavBar
        onLeftIconPress={() => navigation.goBack()}
      />
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
              AuthService.requestOtp(otp_code.otp_secret)
                .then(({ data }) => {
                  console.log(data);
                  setAppState({ otp_code: data.data });
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
