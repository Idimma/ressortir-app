import React, { useContext } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import { Container, NavBar, IconButton } from 'components';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import AddressCard from './AddressCard';
import { AuthContext } from '../../contexts/AuthContext';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
});

const AddressBook = ({ navigation }) => {
  const { delivery_address: addresses } = useContext(AuthContext).auth.user;
console.log(addresses)
  return (
    <Container>
      <NavBar
        title="Address Book"
        onLeftIconPress={() => navigation.goBack()}
        renderRightComponent={() => (
          <IconButton
            icon="plus"
            color="white"
            size={22}
            onPress={() => navigation.navigate('NewAddress', { initialValues: {} })}
          />
        )}
      />
      <ScrollView contentContainerStyle={styles.container}>
        {addresses.map((address) => (
          <AddressCard
            key={address.uuid}
            address={address}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </Container>
  );
};
AddressBook.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default AddressBook;
