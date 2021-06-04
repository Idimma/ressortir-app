import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, } from 'react-native';
import {
  Container, NavBar, ListItem, IconButton, Text,
} from 'components';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';
import { scale } from 'react-native-size-matters';
import Visa from 'svgs/visa.svg';
import MasterCard from 'svgs/mastercard.svg';
import { CardService } from '../../services';
import { catchError } from '../../utils';
import { Spinner, View } from '../../widgets';
import { AuthContext } from '../../contexts/AuthContext';
import { setAppState } from '../../utils/NavigationRef';

const styles = StyleSheet.create({
  label: {
    padding: scale(14),
  },
  plus: {
    borderWidth: 1,
    borderStyle: 'dashed',
    width: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: Colors.gray25,
  },
});

const PaymentMethod = ({ navigation }) => {
  const { auth: {cards}} = useContext(AuthContext);
  const [isLoading, setLoading] = useState(false);
  const onRefresh = () => {
    setLoading(true);
    CardService.allCard()
      .then(({ data }) => {
        setAppState({ cards: data.data });
      }).catch(catchError)
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    return navigation.addListener('focus', () => {
      onRefresh();
    });
  }, [navigation]);

  return (
    <Container>
      <NavBar
        title="Payment Method"
        onLeftIconPress={() => navigation.goBack()}
        renderRightComponent={() => (
          <IconButton
            icon="plus" color="white" size={22}
            onPress={() => navigation.navigate('NewCard', { initialValues: {} })}
          />
        )}
      />
      <View style={styles.label}>
        <Text>Debit / Credit Cards</Text>
      </View>
      {isLoading && <View py={20}>
        <Spinner/>
      </View>}

      {cards.map((card) => {
        const Card = card.type.includes('visa') ? Visa : MasterCard;
        return (
          <ListItem
            key={card.month}
            title={'**** **** **** '+card.suffix}
            subtitle={'Expires: '+ card.month + ' '+ card.year}
            renderLeftComponent={() => (
              <Card/>
            )}
            // onPress={() => navigation.navigate('EditCard', { initialValues: { ...card } })}
          />
        );
      })}
      <ListItem
        title="Add new debit / credit card"
        renderLeftComponent={() => (
          <View style={styles.plus}>
            <Text color="gray25">+</Text>
          </View>
        )}
        onPress={() => navigation.navigate('NewCard', { initialValues: {} })}
      />
      {/*<View style={styles.label}>*/}
      {/*  <Text>Others</Text>*/}
      {/*</View>*/}
      {/*<ListItem*/}
      {/*  title="PayPal"*/}
      {/*  renderLeftComponent={() => (*/}
      {/*    <Icon*/}
      {/*      name="paypal"*/}
      {/*      size={scale(24)}*/}
      {/*      color={Colors.blue}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
      {/*<ListItem*/}
      {/*  title="Online Banking"*/}
      {/*  subtitle="Internet banking log-in needed"*/}
      {/*  renderLeftComponent={() => (*/}
      {/*    <Icon*/}
      {/*      name="university"*/}
      {/*      size={scale(24)}*/}
      {/*      color={Colors.tertiary}*/}
      {/*    />*/}
      {/*  )}*/}
      {/*/>*/}
    </Container>
  );
};

PaymentMethod.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default PaymentMethod;
