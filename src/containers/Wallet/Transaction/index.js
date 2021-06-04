import React, { useEffect, useState } from 'react';
import { Container, NavBar } from 'components';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { getTransactions } from 'mocks/transactions';
import { scale } from 'react-native-size-matters';
import TransactionList from './TransactionList';
import TransactionItem from './TransactionItem';
import { WalletService } from '../../../services';
import { catchError } from '../../../utils';
import { ScrollView, Spinner } from '../../../widgets';

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: scale(14),
    flexGrow: 1,
  },
  flex: {
    flex: 1,
  },
});

const Transactions = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);

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
    });
  }, [navigation]);

  return (
    <Container>
      <NavBar
        title="All Transactions"
        onLeftIconPress={() => navigation.goBack()}
      />
      <View style={styles.flex}>
        <ScrollView style={styles.container}>
          {isLoading && <Spinner/>}
          {history.map((item, i) => <TransactionItem {...item} />)}
        </ScrollView>

        {/*<TransactionList*/}
        {/*  style={styles.container}*/}
        {/*  transactions={getTransactions()}*/}
        {/*/>*/}
      </View>
    </Container>
  );
};

Transactions.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Transactions;
