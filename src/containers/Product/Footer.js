import { Button, WishForm, Text } from 'components';
import {
  SafeAreaView,
  StyleSheet, ActivityIndicator,
  View
} from 'react-native';

import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { scale } from 'react-native-size-matters';
import { Spinner } from '../../widgets';
import { CartService } from '../../services';
import { catchError } from '../../utils';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
    borderTopWidth: StyleSheet.hairlineWidth,
    borderColor: Colors.gray10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  safeArea: {
    backgroundColor: Colors.white,
  },
  leftContainer: {
    flex: 0.8,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  rightContianer: {
    flex: 1,
  },
  icon: {
    marginRight: scale(20),
  },
});

const Footer = ({ onPress, basket, isLoading }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.leftContainer}>
          {/* <IconButton
          icon="home"
          size={scale(16)}
          text="SHOP"
          color="tertiary"
          style={styles.icon}
          onPress={() => navigation.navigate('Shop', { id: shop.id })}
        /> */}
          {/* <IconButton
          icon="message-circle"
          size={scale(16)}
          text="CHAT"
          color="gray50"
          style={styles.icon}
          onPress={() => navigation.navigate('ChatRoom', { id: shop.id })}
        /> */}
          <WishForm basket={basket}/>
        </View>
        <View style={styles.rightContianer}>
          <Button onPress={onPress}>
            {isLoading ? <ActivityIndicator/> : <Text white>Add to Cart</Text>}
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

Footer.propTypes = {
  onPress: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default Footer;
