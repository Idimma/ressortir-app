import React from 'react';
import { Image, StyleSheet, View, } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Text from '../Text';
import { formatMoney, Naira } from '../../utils';

const styles = StyleSheet.create({
  imageContainer: {
    borderRadius: scale(8),
    overflow: 'hidden',
    width: scale(60),
    aspectRatio: 1,
    marginRight: scale(14),
  },
  image: {
    flex: 1,
    width: undefined,
    height: undefined,
  },
  name: {
    marginLeft: scale(14),
  },
  price: {
    alignItems: 'flex-end',
    marginLeft: scale(14),
  },
  flex: {
    flex: 1,
  },
  productsContainer: {
    flexDirection: 'row',
    marginTop: scale(14),
  },
});

const LineItem = ({ product }) => {
  return (
    <View style={styles.productsContainer}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: product
              .product.featured_image.file_url
          }}
          style={styles.image}
          resizeMode="cover"
        />
      </View>
      <View style={styles.flex}>
        <Text>{product.product.name}</Text>
      </View>
      <View style={styles.price}>
        <Text>{Naira + formatMoney(product.discount || product.price)}</Text>
        <Text color="gray50">{`x ${product.quantity}`}</Text>
        <Text gray>{Naira + formatMoney((product.discount || product.price) * (product.quantity || 1) )}</Text>
      </View>
    </View>
  );
};

LineItem.propTypes = {
  product: PropTypes.object.isRequired,
};

export default LineItem;
