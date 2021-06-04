import React from 'react';
import { StyleSheet, View, TextInput } from 'react-native';
import { Button, Card, TextField, } from 'components';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  card: {
    padding: scale(14),
    marginBottom: scale(14),
    flexDirection: 'row',
  },
  textField: {
    flex: 1,
    marginRight: scale(14),
  },
  half: {
    flex: 0.5,
  },
});

const PromoCard = ({ isCode, error, toggleError, onChange, onPress, isLoading,  code }) => {
  return (
    <Card style={styles.card}>
      <View style={styles.textField}>
        <TextField
          label={isCode ? 'Pay Code' : 'Promo code'}
          // error={!code.length && error ? 'Field is required' : ''}
          onBlur={toggleError}
          onChange={onChange}
          initialValue={code}
          keyboardType={isCode ? 'default': 'number-pad'}
        />
      </View>
      {
        !isCode ? <View style={styles.half}>
          <Button onPress={onPress} label="Apply" isLoading={isLoading}/>
        </View> : <View/>
      }

    </Card>
  );
};

export default PromoCard;
