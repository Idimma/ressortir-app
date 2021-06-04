import React from 'react';
import {
  StyleSheet, View, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Text, Card } from 'components';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    margin: scale(14),
  },
  imageContainer: {
    flex: 1,
    aspectRatio: 2 / 1,
    borderTopLeftRadius: scale(8),
    borderTopRightRadius: scale(8),
    overflow: 'hidden',
  },
  image: {
    flex: 1,
    height: undefined,
    width: undefined,
    resizeMode: 'cover',
  },
  contentContainer: {
    padding: scale(14),
  },
});

const NewsItem = ({ title, subtitle, image }) => (
  <TouchableOpacity style={styles.container}>
    <Card>
      <View style={styles.imageContainer}>
        <Image source={image} style={styles.image} />
      </View>
      <View style={styles.contentContainer}>
        <Text weight="medium">{title}</Text>
        <Text color="gray50">{subtitle}</Text>
      </View>
    </Card>
  </TouchableOpacity>
);

NewsItem.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  image: PropTypes.any.isRequired,
};

export default NewsItem;
