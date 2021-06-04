import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';
import { Container, KeyboardAvoidingView, NavBar, } from 'components';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import AddressCard from './Card/Address';
import PaymentCard from './Card/Payment';
import DeliveryCard from './Card/DeliveryOption';
import PromoCard from './Card/Promo';
import Footer from './Footer';
import { AuthContext } from '../../../contexts/AuthContext';
import { catchError, loadCart, Naira, showError, showSuccess } from '../../../utils';
import { View } from '../../../widgets';
import NDC from './Card/NDC';
import { CartService } from '../../../services';
import { isEmpty } from 'lodash';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
});

const Checkout = ({ navigation }) => {
  const {
    carts,
    user
  } = useContext(AuthContext).auth;
  const [delivery, setDelivery] = useState(null);
  const [promo, setPromo] = useState('');
  const [isLoading, setLoading] = useState(false);
  const [promoError, setPromoError] = useState(false);
  const [codeError, setCodeError] = useState(false);
  const [isValidating, setValidating] = useState(false);
  const [paycode, setPayCode] = useState('');
  const [payment, setPayment] = useState('');
  const selected_address = user.delivery_address.find(item => item.default === true) || {};
  const [address, setAddress] = useState({});

  useEffect(() => {
    setAddress(selected_address)
  }, [delivery])

  const togglePromoError = () => setPromoError(!promoError);
  const toggleCodeError = () => setCodeError(!codeError);
  const validatePromoCode = () => {
    if (!promo.length) {
      return showError('Promo Code can not be empty');
    }
    setValidating(true);
    CartService.applyPromo(promo)
      .then(({ data }) => {
        showSuccess('Promo Code applied successfully');
        setValidating(false);
        loadCart()
          .finally(() => showSuccess('Cart Refreshed'));
      })
      .catch(catchError)
      .finally(() => setValidating(false));
  };

  const pay = () => {
    if(isEmpty(address)){
      return showError('Enter an address')
    }

    setLoading(true);
    let action, form;
    if (delivery === 0) {
      form ={ distributor_id: address.id }
      action = CartService.getPickup;
    } else {
      form ={ address: address.uuid }
      action = CartService.getDelivery;
    }
    action(form).then(({ data }) => {
      const request = {};
      if (payment === 'code') {
        request.payment_type = 'paycode';
        request.paycode = paycode;
      } else if (payment === 'wallet') {
        request.payment_type = 'e-wallet';
      } else {
        request.payment_type = 'cards';
        request.card_id = payment;
      }
      setLoading(false);
      navigation.navigate('PaymentResult', {
        data: data.data,
        request,
      });
    })
      .catch((e) => {
        catchError(e);
        setLoading(false);
      });

  };
  return (
    <Container>
      <NavBar
        title="Checkout"
        onLeftIconPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView contentContainerStyle={styles.container}>
        <DeliveryCard onChange={setDelivery}/>
        {![null, '', 1].includes(delivery) ? <NDC onChange={setAddress}/> : <View/>}
        {![null, '', 0].includes(delivery) ?
          <AddressCard navigation={navigation} onChange={setAddress}/> : <View/>}
        <PromoCard
          error={promoError}
          toggleError={togglePromoError}
          isLoading={isValidating}
          onPress={validatePromoCode}
          code={promo} onChange={setPromo}/>
        <PaymentCard onChange={setPayment}/>
        {payment === 'code' ?
          <PromoCard onChange={setPayCode} error={codeError} toggleError={toggleCodeError} isCode
                     code={paycode}/> : <View/>}
      </KeyboardAvoidingView>
      {
        (delivery !== null && payment) ? <Footer
          total={Naira + carts.details.total_price}
          isLoading={isLoading}
          onPress={pay}/> : <View/>
      }

    </Container>
  );
};
Checkout.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Checkout;
