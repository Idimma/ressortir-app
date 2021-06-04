import React, { useContext, useState } from 'react';
import { Container, NavBar } from 'components';
import PropTypes from 'prop-types';
import { StyleSheet } from 'react-native';
import { getUsers } from 'mocks/users';
import { getShops } from 'mocks/shops';
import { getProfile } from 'mocks/me';
import UserList from './User';
import { AuthContext } from '../../contexts/AuthContext';
import { Text } from '../../components';


const styles = StyleSheet.create({
  tab: {
    flex: 1,
  },
});

const NetworkList = ({ navigation }) => {
  const [isVisible, setVisible] = useState(false);
  const { network, user:profile } = useContext(AuthContext).auth;
  return (
    <Container backgroundColor="white">
      <NavBar
        title={network.length + ' Downline(s)'}
        onLeftIconPress={() => navigation.goBack()}
      />
      {!network.length &&
      <Text my={20} p={20}>No Downline found</Text>}
      <UserList data={network}/>
    </Container>
  );
}

NetworkList.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default NetworkList;
