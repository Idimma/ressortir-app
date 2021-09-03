import { GradientBlock, SmallTile, Text } from 'components';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { catchError, refactorProductList } from '../../../utils';

import { ProductService } from '../../../services';
import PropTypes from 'prop-types';
import { Spinner } from '../../../widgets';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: scale(14),
    paddingHorizontal: scale(14),
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: scale(10),
  },
  flash: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  products: {
    paddingVertical: scale(14),
  },
});

const FlashSale = ({ navigation }) => {
  const [list, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    ProductService.getAllProducts(page, { featured: 1 })
      .then(({ data }) => {
        setList(data.data.map(refactorProductList));
        setIsLoading(false);
      })
      .catch(catchError);
  }, [navigation]);

  if (isLoading) {
    return <Spinner/>;
  }
  return (
    <GradientBlock>
      <View style={styles.header}>
        <View style={styles.flash}>
          {/* <Icon name="zap" size={scale(20)} color={Colors.white} style={styles.icon}/> */}
          <Text weight="medium" w={'100%'} center fs={18} color="white">Featured Products</Text>
        </View>
        {/*<TouchableOpacity>*/}
        {/*  <Text color="white">View all</Text>*/}
        {/*</TouchableOpacity>*/}
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.products}
      >
        {list.map((product, index) => (
          <SmallTile
            key={product.id}
            style={StyleSheet.flatten([
              { marginRight: scale(7) },
              index === 0 && { marginLeft: scale(14) },
              index === 7 && { marginRight: scale(14) },
            ])}
            {...product}
            label={`${product.name}`}
            onPress={() => navigation.navigate('Product', { product })}
            // onPress={() => navigation.navigate('Category', { title: `From ${product.price}`, price: product.price.replace(Naira, ''),  })}
          />
        ))}
      </ScrollView>
    </GradientBlock>
  );
};

FlashSale.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default FlashSale;
