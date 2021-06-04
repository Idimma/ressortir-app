import React from 'react';
import { Button, Container, KeyboardAvoidingView, NavBar, TextField, } from 'components';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import { ScrollView } from '../../../widgets';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { UserService } from '../../../services';
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
              new_password: '',
              new_password_confirmation: ''
            }}
            enableReinitialize
            validationSchema={Yup.object()
              .shape({
                current_password: Yup.string()
                  .required('Password is required'),
                new_password: Yup.string()
                  .min(6, 'Password too short')
                  .required('Password is required'),
                new_password_confirmation: Yup.string()
                  .min(6, 'Password too short')
                  .required('Confirmation is required'),

              })}
            onSubmit={(values, { setSubmitting, }) => {
              setSubmitting(true);
              UserService.updatePassword(values)
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
                      if (refs.new_password) {
                        refs.new_password.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
                  <TextField
                    label="New password"
                    secureTextEntry
                    onChangeText={handleChange('new_password')}
                    onBlur={handleBlur('new_password')}
                    value={values.new_password}
                    error={errors.new_password}
                    refs={r => refs.new_password = r}
                    onSubmitEditing={() => {
                      if (refs.new_password_confirmation) {
                        refs.new_password_confirmation.focus();
                      }
                    }}
                    returnKeyType={'next'}
                  />
                  <TextField
                    label="Confirm password"
                    secureTextEntry
                    onChangeText={handleChange('new_password_confirmation')}
                    onBlur={handleBlur('new_password_confirmation')}
                    value={values.new_password_confirmation}
                    error={errors.new_password_confirmation}
                    refs={r => refs.new_password_confirmation = r}
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
