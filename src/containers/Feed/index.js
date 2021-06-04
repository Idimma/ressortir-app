import { Container, NavBar } from 'components';
import { StyleSheet } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { ProductList } from '../../components';
import { ProductService } from '../../services';
import { catchError, refactorProductList } from '../../utils';
import BasicTile from '../../components/Product/BasicTile';
import ListTile from '../../components/Product/ListTile';
import Controls from '../Category/Controls';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(14),
  },

  left: {
    marginLeft: scale(7),
  },
  right: {
    marginRight: scale(7),
  },
  header: {
    marginTop: verticalScale(10),
  },
  footer: {
    marginBottom: verticalScale(10),
  },
  rightIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  icon: {
    marginLeft: scale(20),
  },
});

const Feed = ({ navigation }) => {
  return (
    <Container>
      <NavBar title="Shop"/>
      <ProductList navigation={navigation} sort={'relevance'}/>
    </Container>
  );
};

Feed.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Feed;
