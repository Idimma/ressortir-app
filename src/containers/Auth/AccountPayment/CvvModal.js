import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Modal, Text, Button } from 'components';
import PropTypes from 'prop-types';
import { scale, verticalScale } from 'react-native-size-matters';

const styles = StyleSheet.create({
  body: {
    marginVertical: scale(14),
  },
  image: {
    width: undefined,
    height: verticalScale(150),
  },
});

const CvvModal = ({ isVisible, onModalClose }) => (
  <Modal
    isVisible={isVisible}
    onModalClose={onModalClose}
  >
    <Text weight="medium" centered>What is CVV?</Text>
    <View style={styles.body}>
      <Image
        source={require('images/misc/cvv.png')}
        style={styles.image}
        resizeMode="contain"
      />
      <Text color="gray75" centered>
        The Card Verification Value (CVV) is the 3-digit numbers at the back of your card.
      </Text>
    </View>
    <Button label="Okay" onPress={onModalClose} />
  </Modal>
);

CvvModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onModalClose: PropTypes.func.isRequired,
};

export default CvvModal;
