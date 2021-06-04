import React, { useState } from 'react';
import { Container, NavBar, TextField, } from 'components';
import PropTypes from 'prop-types';
import FormContaienr from './FormContainer';
import { catchError, showSuccess } from '../../utils';
import { AuthService } from '../../services';
import { setAppState } from '../../utils/NavigationRef';

const ResetPassword = ({
  navigation,
  route
}) => {
  const { otp_code } = route.params;
  const [errors, setErrors] = useState({});
  const refs = {};
  const [password, setPassword] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [password_confirmation, setPasswordConfirmation] = useState('');

  const onSubmit = () => {
    if (password.length < 8) {
      return setErrors({ password: 'Must not be less than 8 characters' });
    }
    if (password_confirmation.length < 8) {
      return setErrors({ password_confirmation: 'Must not be less than 8 characters' });
    }
    if (password_confirmation !== password) {
      return setErrors({ password_confirmation: 'Password confirmation must be same as password' });
    }
    otp_code.password = password;
    setLoading(true);
    AuthService.resetPassword(otp_code)
      .then(({ data }) => {
        setLoading(false);
        showSuccess('Account password reset successfully.');
        navigation.navigate('SignIn');
      })
      .catch((e) => {
        catchError(e);
        setLoading(false);
      });
  };

  return (
    <Container asGradient>
      <NavBar
        onLeftIconPress={() => navigation.goBack()}
      />
      <FormContaienr
        title="Reset Password"
        subtitle="Enter your new password and confirm password to reset."
        buttonLabel="Reset Password"
        isLoading={isLoading}
        onSubmit={() => onSubmit()}
      >
        <TextField
          label="Password"
          secureTextEntry
          onChangeText={setPassword}
          onBlur={() => setErrors({ password: null })}
          value={password}
          error={errors.password}
          returnKeyType={'next'}
        />
        <TextField
          label="Confirm Password"
          secureTextEntry
          onChangeText={setPasswordConfirmation}
          onBlur={() => setErrors({ password_confirmation: null })}
          value={password_confirmation}
          error={errors.password_confirmation}
          returnKeyType={'done'}
        />
      </FormContaienr>
    </Container>
  );
};

ResetPassword.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default ResetPassword;
