import React from 'react';
import {
  Container, NavBar,
} from 'components';
import PropTypes from 'prop-types';
import CardForm from './CardForm';

const EditCard = ({ navigation, route }) => {
  const { initialValues } = route.params;
  return (
    <Container>
      <NavBar
        title="Edit Debit / Credit Card"
        onLeftIconPress={() => navigation.goBack()}
      />
      <CardForm
        {...initialValues}
      />
    </Container>
  );
};

EditCard.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default EditCard;
