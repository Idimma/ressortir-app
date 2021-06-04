import {
    Card,
    Container,
    GradientBlock,
    GradientIcon,
    IconButton,
    NavBar,
    Text
} from 'components';
import { Naira, catchError, formatMoney } from '../../utils';
import React, { useEffect, useState } from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import PropTypes from 'prop-types';
import TransactionItem from './Transaction/TransactionItem';
import { WalletService } from '../../services';
import { setAppState } from '../../utils/NavigationRef';

const styles = StyleSheet.create({
  header: {
    height: verticalScale(140),
    alignItems: 'center',
  },
  balance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  amount: {
    marginLeft: scale(10),
  },
  card: {
    height: verticalScale(80),
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    marginTop: verticalScale(-40),
    paddingHorizontal: scale(14),
  },
  button: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  text: {
    marginTop: verticalScale(4),
  },
  listHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: verticalScale(14),
  },
  list: {
    paddingBottom: scale(14),
  },
});

const Wallet = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [wallet, setWallet] = useState({
    main_balance: 0,
    withdrawable_balance: 0,
    ledger_balance: 0
  });
  const [history, setWalletHistory] = useState([]);
  const onRefresh = () => {
    setLoading(true);
    WalletService.history()
      .then(({ data }) => {
        setWalletHistory(data.data);
      })
      .catch(catchError)
      .finally(() => setLoading(false));
  };
  useEffect(() => {
    return navigation.addListener('focus', () => {
      onRefresh();
      WalletService.get()
        .then(({ data }) => {
          setWallet(data.data);
          setAppState({wallet: data.data});
        })
        .catch(catchError);
    });
  }, [navigation]);
  return (
    <Container>
      <NavBar
        title="Wallet"
        renderRightComponent={() => (
          <IconButton
            icon="credit-card"
            size={22}
            color="white"
            onPress={() => navigation.navigate('PaymentMethod')}
          />
        )}
      />
      <ScrollView bounces={false}>
        <GradientBlock style={styles.header}>
          <Text color="white">POINT BALANCE</Text>

          <Text
            color="white"
            font="h1"
            weight="medium"
            style={styles.amount}
          >
            {formatMoney(wallet.withdrawable_balance)}
          </Text>
          <View style={styles.balance}>
            {/*<Coin/>*/}
            <Text fs={19} white>Ledger Balance: {Naira + formatMoney(wallet.ledger_balance, 2)}</Text>
          </View>
        </GradientBlock>

        <View style={styles.container}>
          <Card style={styles.card}>
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('TopUp')}
            >
              <GradientIcon
                icon="wallet-plus-outline"
                size={40}
              />
              <Text color="gray75" style={styles.text}>Top Up</Text>
            </TouchableOpacity>
            {/*<TouchableOpacity style={styles.button}>*/}
            {/*  <GradientIcon*/}
            {/*    icon="account-cash"*/}
            {/*    size={40}*/}
            {/*  />*/}
            {/*  <Text color="gray75" style={styles.text}>Withdraw</Text>*/}
            {/*</TouchableOpacity>*/}
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigation.navigate('PaymentMethod')}
            >
              <GradientIcon
                icon="credit-card"
                size={40}
              />
              <Text color="gray75" style={styles.text}>Cards</Text>
            </TouchableOpacity>
          </Card>
          <View style={styles.list}>
            <View style={styles.listHeader}>
              <Text weight="medium" font="h2" color="gray75">Recent Transactions</Text>
              <TouchableOpacity onPress={() => navigation.navigate('AllTransactions')}>
                <Text color="gray50">View all</Text>
              </TouchableOpacity>
            </View>
            {history.map((item, i) => <TransactionItem key={item.uuid} {...item} />)}
          </View>
        </View>
      </ScrollView>
    </Container>
  );
};

Wallet.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Wallet;
