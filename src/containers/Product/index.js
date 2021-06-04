import { Carousel, Container, NavBar, Rating, Text, WishForm } from 'components';
import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, StyleSheet } from 'react-native';
import Details from './Details';
import Footer from './Footer';
import Option from './Option';
import Quantity from './Quantity';
import PropTypes from 'prop-types';
import { getScreenHeight } from 'utils/size';
import { scale } from 'react-native-size-matters';
import { View } from '../../widgets';
import { catchError, formatMoney, Naira } from '../../utils';
import ReviewList from './Review/ReviewList';
import { CartService } from '../../services';
import { showAlert } from '../../utils/NavigationRef';
import { AuthContext } from '../../contexts/AuthContext';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  carousel: {
    height: getScreenHeight() / 2,
    resizeMode: 'contain',
  },
  discount: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },

  control: {
    flexDirection: 'row',
  },
  icon: {
    paddingLeft: scale(14),
  },
  navbar: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
});

const Product = ({
  navigation,
  route
}) => {

  const { auth: { isLoggedIn } } = useContext(AuthContext);
  const { product } = route.params;
  const [variant, setVariant] = useState('ghost');
  const [weight, setWeight] = useState(product.variants[0]);
  const [isLoading, setLoading] = useState(false);
  const [quantity, setQuanty] = useState(1);
  const [amount, setAmount] = useState(product._price);
  const [price_dis, setPriceDis] = useState(product.price_distribution[0]);
  const [wgt, setWgt] = useState(product._price);

  useEffect(() => {
    setAmount(Number(price_dis.discount || price_dis.price));
    setWgt(price_dis.weight);
  }, [weight]);
  const onScroll = (y) => {
    setVariant(y > getScreenHeight() / 2 ? 'gradient' : 'ghost');
  };
  return (
    <Container>
      <ScrollView
        onScroll={({ nativeEvent: { contentOffset: { y } } }) => onScroll(y)}
        scrollEventThrottle={16}
      >
        <Carousel
          style={styles.carousel} images={product.images}
          autoplay={true}
        />
        <View mb={14} p={14} white card r={0}>
          <View w={'100%'} row spaced>
            <Text font="p1" weight="medium">{product.name}</Text>
            <View central primary={product.status} py={2} px={5} r={5} danger={!product.status}>
              <Text fs={12} white>{product.status_readable}</Text>
            </View>
          </View>
          <View row spaced aligned>
            <View mt={14} mb={10}>
              <Text font="h2" weight="medium" color="tertiary">{Naira + amount}</Text>
              {product.beforeDiscount ?
                <Text font="p1" style={styles.discount}
                      color="gray50">{product?.beforeDiscount}</Text> : null}
            </View>
            <Quantity title={false} initialValue={1} onChange={setQuanty} product={product}/>
          </View>


          <View row spaced>
            <Rating rating={product.rating}/>
            <Text font="p1"
                  color="gray50">{Naira + formatMoney((amount) * (quantity || 1))}</Text>
          </View>
        </View>
        <Option onChange={(value, index) => {
          setPriceDis(product.price_distribution[index]);
          setWeight(value);
        }} product={product}/>

        <Details product={product}/>
        <View mb={14} p={14} white card r={0}>
          <ReviewList id={product.uuid} navigation={navigation}/>
        </View>
      </ScrollView>
      <NavBar
        onLeftIconPress={() => navigation.goBack()}
        containerStyle={styles.navbar}
        title={product.name}
        variant={variant}
        renderRightComponent={() => (
          <View style={styles.control}>
            <WishForm basket={{ product_id: product.id, quantity, weight: wgt}}/>
          </View>
        )}
      />
      <Footer
        isLoading={isLoading}
        basket={{ product_id: product.id, quantity, weight: wgt}}
        onPress={() => {
          if (!isLoggedIn) {
            showAlert('Login or create an account');
            return navigation.navigate('Account');
          }
          setLoading(true);
          CartService.create({
            product_id: product.id,
            quantity,
            weight: wgt
          })
            .then(({ data }) => {
              navigation.navigate('Cart');
              showAlert()
                .alertWithType('success', 'Added to cart successfully',
                  data.message);
            })
            .catch(catchError)
            .finally(() => {
              setLoading(false);
            });
        }}
      />
    </Container>
  )
    ;
};

Product.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};

export default Product;
