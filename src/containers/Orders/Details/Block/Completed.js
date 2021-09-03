import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Card, Text, ProgressBar, } from 'components';
import { scale } from 'react-native-size-matters';
import PropTypes from 'prop-types';
import Colors from 'themes/colors';


const styles = StyleSheet.create({
  container: {
    padding: scale(14),
  },
  review: {
    marginBottom: scale(14),
  },
  bubble: {
    height: scale(10),
    width: scale(10),
    borderRadius: scale(5),
    backgroundColor: Colors.primary,
  },
  box: {
    height: scale(10),
    width: scale(10),
    backgroundColor: Colors.green,
  },
  box_transparent: {
    height: scale(10),
    width: scale(10),
    // backgroundColor: Colors.green,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  trackContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: scale(14),
  },
  shipmentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: scale(14),
    justifyContent: 'space-between',
  },
});

const Completed = ({ navigation }) => (
  <Card style={styles.container}>
    <Text style={styles.review}>
      Order has been succesfully delivered to receiver.
      {/*Please consider leaving a review.*/}
    </Text>
    <View style={styles.trackContainer}>
      <View style={styles.bubble} />
      <ProgressBar
        completion={1}
        size={2}
        indicatorIconName="truck"
      />
      <View style={styles.box_transparent} />
    </View>
    <View style={styles.labelContainer}>
      <Text color="gray50" font="h5">In Transit</Text>
      <Text color="gray50" font="h5">Destination</Text>
    </View>
    {/*<Button*/}
    {/*  label="Leave Review"*/}
    {/*  onPress={() => navigation.navigate('AddReview')}*/}
    {/*/>*/}
  </Card>
);

Completed.propTypes = {
  navigation: PropTypes.object.isRequired,
};

export default Completed;
