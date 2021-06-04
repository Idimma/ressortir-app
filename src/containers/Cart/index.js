import { Container, GradientBlock, NavBar, Text } from 'components';
import { ScrollView, StyleSheet, } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import CartList from './List';
import Footer from './Footer';
import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';
import { CartService } from '../../services';
import { catchError } from '../../utils';
import { Spinner,  View } from '../../widgets';
import { Empty, IconButton } from '../../components';
import { setAppState } from '../../utils/NavigationRef';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(14),
    marginTop: verticalScale(-70),
  },
  block: {
    flexDirection: 'row',
    paddingHorizontal: scale(14),
    paddingBottom: verticalScale(10),
    height: verticalScale(100),
  },
  item: {
    marginRight: scale(20),
  },
});

const Cart = ({ navigation }) => {
  const [carts, setCart] = useState({
    items: [],
    details: {}
  });
  const [isLoading, setLoading] = useState(false);
  const onRefresh = () => {
    setLoading(true);
    CartService.all()
      .then(({ data }) => {
        setCart(data.data);
        setAppState({carts: data.data })
      })
      .catch(catchError)
      .finally(() => setLoading(false));
  }
  useEffect(() => {
    return navigation.addListener('focus', () => {
      onRefresh();
    });
  }, [navigation]);

  return (
    <Container>
      <NavBar title="Shopping Cart"
              renderRightComponent={
                () => (<IconButton icon={'refresh-cw'} color="white" onPress={onRefresh}/> )
              }
      />
      <ScrollView bounces={false}>
        <GradientBlock style={styles.block}>
          <Text color="white" style={styles.item}>{carts.items.length} item(s) in cart</Text>
        </GradientBlock>
        {!carts.items.length && <View central pt={100} flex><Empty/></View>}
        <View style={styles.container}>
          {isLoading ? <Spinner/> :
            <CartList onRefresh={onRefresh} carts={carts.items}/>}
        </View>
      </ScrollView>
      {carts.items.length ? <Footer
        count={carts.items.length}
        details={carts.details}
        navigation={navigation}
      /> : null}
    </Container>
  );
};

Cart.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Cart;
