import React, { useContext } from 'react';
import { Container, NavBar, TextField, } from 'components';
import PropTypes from 'prop-types';
import { AuthContext } from 'contexts/AuthContext';
import { Button, Checkbox, KeyboardAvoidingView, Text } from '../../components';
import { ScrollView, TouchableOpacity, View } from '../../widgets';
import { ActivityIndicator } from 'react-native';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { scale } from 'react-native-size-matters';
import { AuthService } from '../../services';
import { catchError } from '../../utils';
import { setAppState } from '../../utils/NavigationRef';

const SignUp = ({ navigation }) => {
  const { dispatch } = useContext(AuthContext);
  const refs = {};
  return (
    <Container asGradient>
      <NavBar
        onLeftIconPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView contentContainerStyle={{ flex: 1 }}>
        <View white px={scale(16)} py={24} style={{
          borderTopLeftRadius: scale(20),
          borderTopRightRadius: scale(20),
        }}>
          <ScrollView showsVerticalScrollIndicator={false} bounce={false}>
            <View>
              <Text font="h2" weight="medium">Create an Account</Text>
              <Text color="gray75">
                Join today along with million other users to the most exclusive e-commerce
                platform ever
              </Text>
              <Text fs={12} my={20} danger>NB: You will be required to buy a welcome pack food item
                of
                N5,000 to complete
                signup.
              </Text>
            </View>

            <Formik
              initialValues={{
                password: '',
                username: '',
                referral_code: '',
                email: '',
                confirm_password: '',
                phone: '',
                checked: false,
              }}
              enableReinitialize
              validationSchema={Yup.object()
                .shape({
                  password: Yup.string()
                    .min(6, 'Password too short!')
                    .required('Password is required'),
                  email: Yup.string()
                    .email('Enter a valid email'),
                  phone: Yup.string()
                    .required('Field is required'),
                  referral_code: Yup.string(),
                  username: Yup.string()
                    .required('Field is required'),
                  confirm_password: Yup.string()
                    .required('Field is required'),
                  checked: Yup.boolean()
                    .required('Field is required'),
                })}
              onSubmit={(values, { setSubmitting, }) => {
                setSubmitting(true);
                AuthService.registerStart(values)
                  .then(({ data }) => {
                    setAppState({ otp_code: data });
                    navigation.navigate('OTP', { data });

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
                setFieldValue,
                setFieldTouched,
                values,
                errors
              }) => (
                <>
                  <TextField
                    label="Username"
                    onChangeText={handleChange('username')}
                    onBlur={handleBlur('username')}
                    value={values.username}
                    error={errors.username}
                    onSubmitEditing={() => {
                      if (refs.phone) {
                        refs.phone.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
                  <TextField
                    label="Phone number"
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                    keyboardType={'phone-pad'}
                    error={errors.phone}
                    refs={r => refs.phone = r}
                    onSubmitEditing={() => {
                      if (refs.email) {
                        refs.email.focus();
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
                      if (refs.referral) {
                        refs.referral.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
                  <TextField
                    label="Referral Code"
                    onChangeText={handleChange('referral_code')}
                    onBlur={handleBlur('referral_code')}
                    value={values.referral_code}
                    error={errors.referral_code}
                    refs={r => refs.referral = r}
                    onSubmitEditing={() => {
                      if (refs.password) {
                        refs.password.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
                  <TextField
                    label="Password"
                    secureTextEntry
                    refs={r => refs.password = r}
                    error={errors.password}
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    onSubmitEditing={() => {
                      if (refs.confirm_password) {
                        refs.confirm_password.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
                  <TextField
                    label="Confirm Password"
                    secureTextEntry
                    refs={r => refs.confirm_password = r}
                    error={errors.confirm_password}
                    onChangeText={handleChange('confirm_password')}
                    onBlur={handleBlur('confirm_password')}
                    value={values.confirm_password}
                    onSubmitEditing={handleSubmit}
                    returnKeyType={'done'}
                  />

                  <View row w={'99%'}>
                    <Checkbox
                      onChange={(check) => {
                        setFieldTouched('checked', true);
                        setFieldValue('checked', check);
                      }}
                      value={values.checked}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
                      <Text ml={6} pr={4} style={{ flexWrap: 'wrap' }} flex>
                        By signing up, I agree to the <Text primary>Terms and
                        Conditions</Text></Text>
                    </TouchableOpacity>

                  </View>
                  {errors.checked &&
                  <Text italic pl={26} danger fs={12}>Please confirm to continue</Text>}

                  <View h={120} pb={20} my={20}>
                    <Button onPress={handleSubmit} isLoading={isSubmitting}>
                      {isSubmitting ? <ActivityIndicator color={'#fff'}/> :
                        <Text fs={16} white center>Sign Up</Text>}
                    </Button>
                  </View>

                </>)}
            </Formik>
          </ScrollView>
        </View>
      </KeyboardAvoidingView>
    </Container>
  );
};

SignUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default SignUp;
