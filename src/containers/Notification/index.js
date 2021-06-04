import { Container, NavBar } from 'components';
import { StyleSheet, View } from 'react-native';
import { getActivities, getNews } from 'mocks/notifications';

import ActivityList from './Activity';
import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import React from 'react';

const activities = getActivities();

const styles = StyleSheet.create({
  activities: {
    flex: 1,
  },
  news: {
    flex: 1,
    backgroundColor: Colors.gray5,
  },
});

const Notification = ({ navigation }) => (
  <Container backgroundColor="white">
    <NavBar
      title="Notifications"
      onLeftIconPress={() => navigation.goBack()}
    />
    {/* <Tabs> */}
      <View label="Activities" style={styles.activities}>
        <ActivityList data={[]} />
      </View>
      {/* <View label="News" style={styles.news}>
        <NewsList data={news} />
      </View> */}
    {/* </Tabs> */}
  </Container>
);

Notification.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Notification;
