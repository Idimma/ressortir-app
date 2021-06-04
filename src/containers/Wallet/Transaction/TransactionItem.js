import { Card, Text } from 'components';
import { StyleSheet, View } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';

import Colors from 'themes/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import React from 'react';
import { formatMoney } from '../../../utils';

const styles = StyleSheet.create({
  container: {
    marginTop: verticalScale(10),
    flexDirection: 'row',
    padding: scale(14),
    alignItems: 'center',
  },
  content: {
    flex: 1,
    paddingHorizontal: scale(14),
  },
  amount: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  deposit: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  debit: {
    width: scale(40),
    height: scale(40),
    borderRadius: scale(20),
    backgroundColor: Colors.red,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TransactionItem = ({
  description, title, type, category,  amount,
}) => {
  if (type === 'Debit') {
    return (
      <Card style={styles.container}>
       <View style={styles.debit}>
        <Icon
          name="wallet"
          color={Colors.white}
          size={scale(20)}
        />
      </View>
        <View style={styles.content}>
          {/* <Text weight="medium" color="gray75" capitalize numberOfLines={1}>{category}</Text> */}
          <Text color="gray50" capitalize>{description}</Text>
        </View>
        <Text font="p1" weight="medium" color="red">{`- ${formatMoney(amount, 2)}`}</Text>
      </Card>
    );
  }
  return (
    <Card style={styles.container}>
      <View style={styles.deposit}>
        <Icon
          name="wallet-plus-outline"
          color={Colors.white}
          size={scale(20)}
        />
      </View>
      <View style={styles.content}>
        {/* <Text weight="medium" capitalize color="gray75">{category}</Text> */}
        <Text capitalize color="gray50">{description}</Text>
      </View>
      <Text font="p1" weight="medium" color="green">{`+ ${formatMoney(amount)}`}</Text>
    </Card>
  );
};

TransactionItem.propTypes = {
  description: PropTypes.string.isRequired,
  title: PropTypes.string,
  type: PropTypes.string.isRequired,
  shopId: PropTypes.number,
};

TransactionItem.defaultProps = {
  title: null,
  shopId: null,
};

export default TransactionItem;
