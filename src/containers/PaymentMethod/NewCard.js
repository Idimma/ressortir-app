import React from 'react';
import {
  Container, NavBar,
} from 'components';
import PropTypes from 'prop-types';
import CardForm from './CardForm';

const NewCard = ({ navigation }) => (
  <Container>
    <NavBar
      title="New Debit"
      onLeftIconPress={() => navigation.goBack()}
    />
    <CardForm onDone={() => navigation.goBack()} />
  </Container>
);

NewCard.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default NewCard;
