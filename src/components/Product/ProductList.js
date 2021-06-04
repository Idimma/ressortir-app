import { FlatList, RefreshControl, StyleSheet, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { catchError, refactorProductList } from '../../utils';

import BasicTile from './BasicTile';
import Colors from 'themes/colors';
import Controls from '../../containers/Category/Controls';
import { Empty } from '../Layout';
import ListTile from './ListTile';
import { ProductService } from '../../services';
import PropTypes from 'prop-types';
import { Spinner } from '../../widgets';
import Text from '../Text';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: scale(14),
    paddingVertical: scale(10),
  },
  left: {
    marginLeft: scale(7),
  },
  right: {
    marginRight: scale(7),
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    marginTop: scale(20),
  },
  divider: {
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray50,
    flex: 1,
    marginTop: scale(20),
    marginHorizontal: scale(14),
  },
});

const ProductList = ({title, navigation, sort, isSearch, hideControl, params}) => {
  const [productsList, setList] = useState([]);
  const [page, setPage] = useState(1);
  const [variant, setVariant] = useState('grid');
  const [selectedTab, setSelectedTab] = useState(sort || 'relevance');
  const [lastPage, setLastPage] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMore, setMore] = useState(false);

  useEffect(() => {
    ProductService.getAllProducts(page, params)
      .then(({ data }) => {
        if (page === 1) {
          setList(data.data.map(refactorProductList));
        } else {
          setList([...productsList, ...data.data.map(refactorProductList)]);
        }
        setPage(data.meta.current_page);
        setLastPage(data.meta.last_page);
      })
      .catch(catchError)
      .finally(() => {
        setIsLoading(false);
        setMore(false);
      });
  }, [page]);

  const _handleLoadMore = () => {
    let next = page + 1;
    if (next <= lastPage) {
      setPage(next);
      setMore(true);
    }
  };

  const filter = {
    relevance: 'average_rating',
    latest: 'created_at',
    price: '_price',
    top: 'views'
  };
  const products = productsList.sort(function (a, b) {
    return b[filter[selectedTab]] - a[filter[selectedTab]];
  });

  const Tile = variant === 'grid' ? BasicTile : ListTile;
  return (
    <View>
      {title && (
        <View style={styles.header}>
          <View style={styles.divider}/>
          <Text
            weight="medium"
            color="gray75"
            centered
            style={styles.title}
          >
            {title}
          </Text>
          <View style={styles.divider}/>
        </View>
      )}
      {!hideControl && <Controls
        selectedTab={selectedTab}
        setSelectedTab={setSelectedTab}
        onDisplayChange={setVariant}/>}

      {variant === 'grid' ?
        <FlatList
          style={{
            padding: scale(14),
          }}
          data={products}
          numColumns={2}
          keyExtractor={(data) => data.uuid.toString()}
          renderItem={({
            item,
            index
          }) => {
            return (
              <Tile
                onPress={() => navigation.navigate('Product', { product: item })}
                key={item.id}
                // parentMargin={0}
                style={index % 2 === 0 ? styles.right : styles.left}
                {...item}
              />
            );
          }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={() => setPage(1)}
            />
          }
          ListEmptyComponent={Empty}
          onEndReached={_handleLoadMore}
          onEndReachedThreshold={0.5}
          initialNumToRender={12}
          ListFooterComponent={loadingMore ? <Spinner/> : <View style={styles.footer}/>}
        />
        :
        <View style={StyleSheet.flatten([
          styles.container,
          { flexDirection: variant === 'grid' ? 'row' : 'column' },
          { flexWrap: variant === 'grid' ? 'wrap' : 'nowrap' },
        ])}
        >
          {products.map((product, index) => (
            <Tile
              onPress={() => navigation.navigate('Product', { product })}
              key={product.id}
              style={index % 2 === 0 ? styles.right : styles.left}
              {...product}
            />
          ))}
        </View>}
    </View>
  );
};

ProductList.propTypes = {
  navigation: PropTypes.object.isRequired,
  numberOfProducts: PropTypes.number,
  title: PropTypes.string,
  variant: PropTypes.oneOf(['list', 'grid']),
  products: PropTypes.array,
};

ProductList.defaultProps = {
  numberOfProducts: 10,
  title: null,
  variant: 'grid',
  params: {},
  sort: 'latest',
  products: [],
};

export default ProductList;
