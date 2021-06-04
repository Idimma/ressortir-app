import React from 'react';
import { FlatList } from 'react-native';
import PropTypes from 'prop-types';
import NewsItem from './NewsItem';

const NewsList = ({ data }) => (
  <FlatList
    data={data}
    keyExtractor={(item) => item.title}
    renderItem={({ item }) => (
      <NewsItem {...item} />
    )}
  />
);

NewsList.propTypes = {
  data: PropTypes.array.isRequired,
};

export default NewsList;
