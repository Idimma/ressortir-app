import { StyleSheet, TouchableOpacity, View } from 'react-native';

import PropTypes from 'prop-types';
import React from 'react';
import { Text } from 'components';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  tab: {
    alignItems: 'center',
    flexGrow: 1,
  },
});


const MetaTab = ({ navigation, tabs }) => (
  <View style={styles.container}>
    {tabs.map((tab) => (
      <TouchableOpacity
        key={tab.name}
        style={styles.tab}
        onPress={tab.route ? () => navigation.navigate(tab.route) : null}
      >
        <Text color="white" weight="medium" font="p1">{tab.value}</Text>
        <Text color="white">{tab.name}</Text>
      </TouchableOpacity>
    ))}
  </View>
);

MetaTab.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default MetaTab;
