import React from 'react';
import {
  Container, NavBar,
} from 'components';
import PropTypes from 'prop-types';
import CardForm from './CardForm';

const AccountPayment = ({ navigation }) => (
  <Container>
    <NavBar title="Membership Fee" onLeftIconPress={() => navigation.goBack()} />
    <CardForm  />

  </Container>
);

AccountPayment.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AccountPayment;
