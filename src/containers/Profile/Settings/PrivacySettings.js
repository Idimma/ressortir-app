import React, { useContext } from 'react';
import { StyleSheet, View } from 'react-native';
import { Container, NavBar, Switch, Text, } from 'components';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import { AuthContext } from '../../../contexts/AuthContext';
import { UserService } from '../../../services';
import { catchError } from '../../../utils';
import { setAppState } from '../../../utils/NavigationRef';

const styles = StyleSheet.create({
  container: {},
  label: {
    paddingHorizontal: scale(14),
    paddingVertical: scale(8),
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

const PrivacySettings = ({ navigation }) => {
  const { user } = useContext(AuthContext).auth;
  const { preference } = user;
  const change = form => UserService.preference(form).then(({data}) => {
    setAppState({user : {...user, preference : data.data}})
  }).catch(catchError)
  return (
    <Container>
      <NavBar
        title="Privacy Settings"
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.container}>
        <View style={styles.listItem}>
          <Text>Notifications Activities</Text>
          <Switch
            initialValue={preference?.notification || false}
            onChange={(notification) => change({ notification })}
          />
        </View>
        <View style={styles.label}>
          <Text color="gray50" font="h5">
            Turn on notification activity to receive instant notifications.
          </Text>
        </View>

        <View style={styles.listItem}>
          <Text>Newsletter</Text>
          <Switch initialValue={preference?.newsletter || false}
                  onChange={(newsletter) => change({ newsletter })}/>
        </View>
        <View style={styles.label}>
          <Text color="gray50" font="h5">
           Sign up for our newsletter
          </Text>
        </View>

      </View>
    </Container>
  );
};

PrivacySettings.propTypes = {
  navigation: PropTypes.object.isRequired,
};
export default PrivacySettings;
