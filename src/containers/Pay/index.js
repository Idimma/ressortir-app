import React from 'react';
import {
  Container, NavBar, Card, Text, Coin, IconButton,
} from 'components';
import { View, StyleSheet, Image } from 'react-native';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';
import { scale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
  footer: {
    backgroundColor: Colors.gray5,
    padding: scale(14),
    borderBottomLeftRadius: scale(8),
    borderBottomRightRadius: scale(8),
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    padding: scale(24),
  },
  balance: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  coin: {
    marginRight: scale(5),
  },
  barcode: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
  barcodeContainer: {
    height: scale(80),
    marginBottom: scale(24),
  },
  qrcodeContainer: {
    height: scale(180),
    marginBottom: scale(24),
  },
  qrcode: {
    flex: 1,
    width: undefined,
    height: undefined,
    resizeMode: 'contain',
  },
});

const Pay = ({ navigation }) => (
  <Container asGradient>
    <NavBar
      title="Pay"
      onLeftIconPress={() => navigation.goBack()}
      renderRightComponent={() => (
        <IconButton
          icon="more-vertical"
          color="white"
          size={22}
        />
      )}
    />
    <View style={styles.container}>
      <Card>
        <View style={styles.content}>
          <View style={styles.barcodeContainer}>
            <Image
              source={require('images/misc/barcode.png')}
              style={styles.barcode}
            />
          </View>
          <View style={styles.qrcodeContainer}>
            <Image
              source={require('images/misc/qrcode.png')}
              style={styles.qrcode}
            />
          </View>
          <Text color="gray50" centered>
            Refreshes every 60 seconds automatically
          </Text>
        </View>
        <View style={styles.footer}>
          <Text color="gray50">eWallet Balance</Text>
          <View style={styles.balance}>
            <Coin color="primary" style={styles.coin} />
            <Text color="gray75" weight="medium">9,000</Text>
          </View>
        </View>
      </Card>
    </View>
  </Container>
);

Pay.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Pay;
