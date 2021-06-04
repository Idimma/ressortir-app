import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import ActivityItem from './ActivityItem';
import { Empty } from '../../../components';

const ActivityList = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.datetime}
    renderItem={({ item }) => (
      <ActivityItem {...item} />
    )}
    ListEmptyComponent={Empty}
  />
);

ActivityList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default ActivityList;
