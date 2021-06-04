import {
  Button,
  Container,
  KeyboardAvoidingView,
  NavBar,
  PaymentSelect,
  Text,
  TextField
} from 'components';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import Colors from 'themes/colors';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import { TouchableOpacity } from '../../widgets';
import { AuthContext } from '../../contexts/AuthContext';
import { WalletService } from '../../services';
import { catchError, showSuccess } from '../../utils';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
  optionContainer: {
    flexDirection: 'row',
    marginTop: scale(14),
  },
  option: {
    padding: scale(10),
    flex: 1,
    borderWidth: 1,
    borderColor: Colors.gray25,
    borderRadius: scale(60),
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.gray5,
  },
  space: {
    marginHorizontal: scale(14),
  },
  selected: {
    backgroundColor: Colors.primaryBg,
    borderColor: Colors.primary,
  },
  buttonContainer: {
    paddingVertical: scale(14),
  },
  payment: {
    marginBottom: scale(14),
  },
});

const TopUp = ({ navigation }) => {
  const { auth: { cards } } = useContext(AuthContext);

  const [isLoading, setLoading] = useState(false);
  const [amount, setAmount] = useState(null);
  const [uuid, setUuid] = useState(cards.length ? cards[0].uuid : '');
  const onTopUp = () => {
    setLoading(true);
    WalletService.cardTopUp(amount, uuid)
      .then(() => {
        showSuccess('Account top up successful');
        navigation.navigate('Wallet')
      })
      .catch((e) => {
        catchError(e);
        setLoading(false);
      });
  };

  return (
    <Container backgroundColor="white">
      <NavBar
        title="Top Up"
        onLeftIconPress={() => navigation.goBack()}
      />
      <KeyboardAvoidingView contentContainerStyle={styles.container}>
        <TextField
          label="Enter your preferred amount"
          onChangeText={setAmount}
          keyboardType={'number-pad'}
          value={amount}
          onSubmitEditing={onTopUp}
          returnKeyType={'done'}
        />
        <Text color="gray75" weight="medium" style={styles.payment}>
          Select payment method:</Text>
        <PaymentSelect onChange={setUuid} options={cards}/>

        <View style={styles.buttonContainer}>
          <Button isLoading={isLoading} onPress={onTopUp} label="Top Up"/>
        </View>

        <TouchableOpacity
          central mt={45}
          onPress={() => navigation.navigate('PaymentMethod')}>
          <Text primary>Add New Card</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </Container>
  );
};

TopUp.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default TopUp;
