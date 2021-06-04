import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { scale } from 'react-native-size-matters';
import Visa from 'svgs/visa.svg';
import MasterCard from 'svgs/mastercard.svg';
import Icon from 'react-native-vector-icons/FontAwesome5';
import Card from '../Card';
import Text from '../Text';
import Checkbox from './Checkbox';
import { Empty } from '../Layout';
import { TouchableOpacity, View } from '../../widgets';

const styles = StyleSheet.create({
  container: {
    marginBottom: scale(14),
  },
  card: {
    padding: scale(14),
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentContainer: {
    marginHorizontal: scale(14),
    flex: 1,
  },
  leftContainer: {
    minWidth: scale(40),
    minHeight: scale(40),
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const PaymentSelect = ({
  options,
  onSelect,
  onChange
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const getIcon = (option) => {
    if (option?.icon) {
      return (
        <Icon
          name={option.icon}
          color={option.iconColor}
          size={scale(24)}
        />
      );
    }
    try {
      return option?.type?.includes('visa') ? <Visa/> : <MasterCard/>;
    } catch (e) {
      return <MasterCard/>;
    }
  };

  const onPaymentSelect = (index) => {
    setSelectedIndex(index);
    if (onSelect) {
      const selected = options[index];
      const isCard = selected.hasOwnProperty('type') && !['wallet', 'code'].includes(selected.type);
      onSelect({
        title: isCard ? ((selected?.type.includes('visa') ? '49' : '56') + '** **** **** ' + selected?.suffix) : selected.title,
        subtitle: isCard ? ((selected?.month + '/' + selected.year) || 'Credit / Debit Card') : selected.subtitle,
        Icon: getIcon(selected),
      });
    }
  };

  return (
    <>
      {options.length ? options.map((option, index) => {
        const isSelected = selectedIndex === index;
        const isCard = option.hasOwnProperty('type') && !['wallet', 'code'].includes(option.type);
        return (
          <TouchableOpacity
            key={option?.cardNumber || option?.title}
            style={styles.container}
            onPress={() => {
              onPaymentSelect(index);
              onChange && onChange(isCard ? option.id : option.type);
            }}
          >
            <Card style={styles.card}>
              <View style={styles.leftContainer}>
                {getIcon(option)}
              </View>
              <View style={styles.contentContainer}>
                {isCard ?
                  <Text>{(option?.type.includes('visa') ? '49' : '56') + '** **** **** ' + option?.suffix}</Text> :
                  <Text>{option.title}</Text>}
                <Text color="gray50">
                  {isCard ? (option?.month + '/' + option.year) : option.subtitle}
                </Text>
              </View>
              <Checkbox
                value={isSelected}
                controlledExternally
              />
            </Card>
          </TouchableOpacity>
        );
      }) : <View flex>
        <Empty text={'No Card Found'}/>
      </View>
      }
    </>
  );
};

PaymentSelect.propTypes = {
  options: PropTypes.array.isRequired,
  onSelect: PropTypes.func,
};

PaymentSelect.defaultProps = {
  onSelect: null,
};

export default PaymentSelect;
