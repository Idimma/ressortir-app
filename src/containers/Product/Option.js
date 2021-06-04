import React from 'react';
import { Select, Text } from 'components';
import {
  View, Image, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(14),
  },
  imageContainer: {
    borderRadius: scale(8),
    overflow: 'hidden',
    width: scale(80),
    aspectRatio: 1 / 1,
    marginRight: scale(14),
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  contentHeader: {
    flexDirection: 'row',
    padding: scale(14),
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray25,
  },
  option: {
    backgroundColor: Colors.white,
    padding: scale(14),
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  size: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const Option = ({ product, onChange }) => (
  <View style={styles.container}>
    <Select
      options={product.variants}
      value={product.variants[0]}
      optionTitle="Select options:"
      onChange={onChange}
      renderTouchable={({ onPress, value }) => (
          <TouchableOpacity onPress={onPress} style={styles.option}>
            <Text>Select size</Text>
            <View style={styles.size}>
              <Text>{value}</Text>
              <Icon
                name="chevron-right"
                color={Colors.gray50}
                size={scale(20)}
              />
            </View>
          </TouchableOpacity>
        )
      }
      renderContentHeader={() => (
        <View style={styles.contentHeader}>
          <View style={styles.imageContainer}>
            <Image
              source={product.images[0]}
              style={styles.image}
              resizeMode="cover"
            />
          </View>
          <View>
            <Text numberOfLines={1}>{product.name}</Text>
            <Text flex color="primary" weight="medium" font="h2">{product.price}</Text>
          </View>
        </View>
      )}
    />
  </View>

);

Option.propTypes = {
  product: PropTypes.object.isRequired,
};

export default Option;
