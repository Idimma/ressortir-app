import React from 'react';
import { Button, Container, KeyboardAvoidingView, NavBar, TextField, } from 'components';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import { ScrollView } from '../../../widgets';
import { Formik } from 'formik';
import * as Yup from 'yup';
import {AuthService, UserService} from '../../../services';
import { catchError, showSuccess } from '../../../utils';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
    flex: 1,
  },
  form: {
    flex: 1,

  },
  avatar: {
    alignSelf: 'center',
    marginTop: scale(14),
    marginBottom: scale(24),
  },
});

const ChangePassword = ({ navigation }) => {
  const refs = {};
  return (
    <Container backgroundColor="white">
      <NavBar
        title="Change Password"
        onLeftIconPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView contentContainerStyle={styles.container}>
        {/*<ScrollView showsVerticalScrollIndicator={false} bounce={false}>*/}
          <Formik
            initialValues={{
              current_password: '',
              password: '',
              password_confirmation: ''
            }}
            enableReinitialize
            validationSchema={Yup.object()
              .shape({
                current_password: Yup.string()
                  .required('Password is required'),
                password: Yup.string()
                  .min(6, 'Password too short')
                  .required('Password is required'),
                password_confirmation: Yup.string()
                  .min(6, 'Password too short')
                  .required('Confirmation is required'),

              })}
            onSubmit={(values, { setSubmitting, }) => {
              setSubmitting(true);
              AuthService.editPassword(values)
                .then(({ data }) => {
                  showSuccess('Password Updated successfully');
                  navigation.goBack();
                })
                .catch((e) => {
                  setSubmitting(false);
                  catchError(e);
                });
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
              <View flex>
                <View style={styles.form}>
                  <TextField
                    label="Current password"
                    secureTextEntry
                    onChangeText={handleChange('current_password')}
                    onBlur={handleBlur('current_password')}
                    value={values.current_password}
                    error={errors.current_password}
                    onSubmitEditing={() => {
                      if (refs.password) {
                        refs.password.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
                  <TextField
                    label="New password"
                    secureTextEntry
                    onChangeText={handleChange('password')}
                    onBlur={handleBlur('password')}
                    value={values.password}
                    error={errors.password}
                    refs={r => refs.password = r}
                    onSubmitEditing={() => {
                      if (refs.password_confirmation) {
                        refs.password_confirmation.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
                  <TextField
                    label="Confirm password"
                    secureTextEntry
                    onChangeText={handleChange('password_confirmation')}
                    onBlur={handleBlur('password_confirmation')}
                    value={values.password_confirmation}
                    error={errors.password_confirmation}
                    refs={r => refs.password_confirmation = r}
                    onSubmitEditing={handleSubmit}
                    returnKeyType={'done'}
                  />
                </View>
                <Button
                  label="Confirm" isLoading={isSubmitting}
                  onPress={handleSubmit}
                />
              </View>)}
          </Formik>
        {/*</ScrollView>*/}
      </KeyboardAvoidingView>
    </Container>
  );
};

ChangePassword.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ChangePassword;
