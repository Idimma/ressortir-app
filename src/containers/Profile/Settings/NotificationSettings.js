import React from 'react';
import { StyleSheet, View } from 'react-native';
import {
  Container, NavBar, Text, Switch,
} from 'components';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';

const styles = StyleSheet.create({
  container: {
    paddingVertical: scale(14),
  },
  label: {
    padding: scale(14),
  },
  listItem: {
    backgroundColor: Colors.white,
    padding: scale(14),
    borderBottomWidth: 1,
    borderColor: Colors.gray10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

const Notification = ({ navigation }) => (
  <Container>
    <NavBar
      title="Notifications"
      onLeftIconPress={() => navigation.goBack()}
    />
    <View style={styles.container}>
      <View style={styles.label}>
        <Text>App Notifications</Text>
      </View>
      <View style={styles.listItem}>
        <Text>Push notifications</Text>
        <Switch initialValue />
      </View>
      <View style={styles.label}>
        <Text>Email Notifications</Text>
      </View>
      <View style={styles.listItem}>
        <Text>Order Updates</Text>
        <Switch initialValue />
      </View>
      <View style={styles.listItem}>
        <Text>Listing Uppdates</Text>
        <Switch />
      </View>
      <View style={styles.listItem}>
        <Text>Newsletter</Text>
        <Switch initialValue />
      </View>
      <View style={styles.listItem}>
        <Text>Personalized Content</Text>
        <Switch />
      </View>
    </View>
  </Container>
);

Notification.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default Notification;
